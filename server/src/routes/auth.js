const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Wallet = require('../models/Wallet');

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';

// Generate JWT token
const generateToken = (userId) => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
};

// Register
router.post('/register', [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }),
    body('firstName').trim().notEmpty(),
    body('lastName').trim().notEmpty()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { email, password, firstName, lastName } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already registered' });
        }

        // Generate verification token
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

        // Create user
        const user = new User({
            email,
            password,
            firstName,
            lastName,
            verificationToken,
            verificationExpires
        });

        await user.save();

        // Auto-verify for now (Bypass Email)
        user.isVerified = true;
        user.status = 'active';
        await user.save();

        // Create wallet
        const wallet = new Wallet({ user: user._id });
        await wallet.save();

        res.status(201).json({
            success: true,
            message: 'Registration successful! You can now log in.'
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ success: false, message: 'Registration failed' });
    }
});

// Login
router.post('/login', [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        if (user.status === 'suspended') {
            return res.status(403).json({ success: false, message: 'Account suspended' });
        }

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        const token = generateToken(user._id);

        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                isVerified: user.isVerified,
                kycStatus: user.kycStatus,
                twoFactorEnabled: user.twoFactorEnabled
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Login failed' });
    }
});


// Get current user (auth check)
const auth = require('../middleware/auth');
router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password -twoFactorSecret');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({
            success: true,
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                status: user.status,
                isVerified: user.isVerified,
                kycStatus: user.kycStatus,
                twoFactorEnabled: user.twoFactorEnabled
            }
        });
    } catch (error) {
        console.error('Get me error:', error);
        res.status(500).json({ success: false, message: 'Failed to get user' });
    }
});

// Verify email
router.post('/verify-email', async (req, res) => {
    try {
        const { token } = req.body;

        const user = await User.findOne({
            verificationToken: token,
            verificationExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid or expired token' });
        }

        user.isVerified = true;
        user.status = 'active';
        user.verificationToken = undefined;
        user.verificationExpires = undefined;
        await user.save();

        res.json({ success: true, message: 'Email verified successfully' });

    } catch (error) {
        console.error('Verification error:', error);
        res.status(500).json({ success: false, message: 'Verification failed' });
    }
});

// Forgot password
router.post('/forgot-password', [
    body('email').isEmail().normalizeEmail()
], async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            // Don't reveal if user exists
            return res.json({ success: true, message: 'If the email exists, a reset link has been sent' });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
        await user.save();

        // TODO: Send reset email

        res.json({ success: true, message: 'If the email exists, a reset link has been sent' });

    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ success: false, message: 'Request failed' });
    }
});

// Reset password
router.post('/reset-password', [
    body('token').notEmpty(),
    body('password').isLength({ min: 8 })
], async (req, res) => {
    try {
        const { token, password } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid or expired token' });
        }

        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.json({ success: true, message: 'Password reset successfully' });

    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ success: false, message: 'Reset failed' });
    }
});

module.exports = router;

const express = require('express');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const User = require('../models/User');
const Wallet = require('../models/Wallet');
const { Transaction } = require('../models/Wallet');
const { InvestmentPlan, Investment } = require('../models/Investment');

const router = express.Router();

// Apply auth and admin check to all routes
router.use(auth, adminAuth);

// Get dashboard stats
router.get('/stats', async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const activeUsers = await User.countDocuments({ status: 'active' });
        const totalDeposits = await Transaction.aggregate([
            { $match: { type: 'deposit', status: 'completed' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        const totalWithdrawals = await Transaction.aggregate([
            { $match: { type: 'withdrawal', status: 'completed' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        const pendingWithdrawals = await Transaction.aggregate([
            { $match: { type: 'withdrawal', status: 'pending' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);

        res.json({
            success: true,
            stats: {
                totalUsers,
                activeUsers,
                totalDeposits: totalDeposits[0]?.total || 0,
                totalWithdrawals: totalWithdrawals[0]?.total || 0,
                pendingWithdrawals: pendingWithdrawals[0]?.total || 0
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch stats' });
    }
});

// Get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find()
            .select('-password -twoFactorSecret')
            .sort({ createdAt: -1 });
        res.json({ success: true, users });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch users' });
    }
});

// Update user status
router.put('/users/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        ).select('-password');
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update user' });
    }
});

// Get pending transactions
router.get('/transactions', async (req, res) => {
    try {
        const transactions = await Transaction.find()
            .populate('user', 'email firstName lastName')
            .sort({ createdAt: -1 });
        res.json({ success: true, transactions });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch transactions' });
    }
});

// Approve/reject transaction
router.put('/transactions/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({ success: false, message: 'Transaction not found' });
        }

        const wallet = await Wallet.findOne({ user: transaction.user });

        if (status === 'completed') {
            if (transaction.type === 'deposit') {
                wallet.balance += transaction.amount;
                wallet.totalDeposited += transaction.amount;
            } else if (transaction.type === 'withdrawal') {
                wallet.balance -= transaction.amount;
                wallet.pendingWithdrawals -= transaction.amount;
                wallet.totalWithdrawn += transaction.amount;
            }
            await wallet.save();
        } else if (status === 'failed' && transaction.type === 'withdrawal') {
            wallet.pendingWithdrawals -= transaction.amount;
            await wallet.save();
        }

        transaction.status = status;
        transaction.processedAt = new Date();
        transaction.processedBy = req.userId;
        await transaction.save();

        res.json({ success: true, transaction });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update transaction' });
    }
});

// Investment plans CRUD
router.get('/plans', async (req, res) => {
    try {
        const plans = await InvestmentPlan.find();
        res.json({ success: true, plans });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch plans' });
    }
});

router.post('/plans', async (req, res) => {
    try {
        const plan = new InvestmentPlan(req.body);
        await plan.save();
        res.status(201).json({ success: true, plan });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to create plan' });
    }
});

router.put('/plans/:id', async (req, res) => {
    try {
        const plan = await InvestmentPlan.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json({ success: true, plan });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update plan' });
    }
});

router.delete('/plans/:id', async (req, res) => {
    try {
        await InvestmentPlan.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Plan deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete plan' });
    }
});

// ============================================
// COMPREHENSIVE USER MANAGEMENT ENDPOINTS
// ============================================

// Get complete user data (profile, wallet, investments, transactions)
router.get('/users/:id/full', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password -twoFactorSecret');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const wallet = await Wallet.findOne({ user: req.params.id });
        const investments = await Investment.find({ user: req.params.id })
            .populate('plan')
            .sort({ createdAt: -1 });
        const transactions = await Transaction.find({ user: req.params.id })
            .sort({ createdAt: -1 })
            .limit(50);

        // Calculate portfolio stats
        const activeInvestments = investments.filter(inv => inv.status === 'active');
        const totalInvested = activeInvestments.reduce((sum, inv) => sum + inv.amount, 0);
        const totalProfit = activeInvestments.reduce((sum, inv) => sum + (inv.profit || 0), 0);

        res.json({
            success: true,
            data: {
                user,
                wallet,
                investments,
                transactions,
                stats: {
                    totalInvested,
                    totalProfit,
                    portfolioValue: totalInvested + totalProfit,
                    activeInvestmentsCount: activeInvestments.length
                }
            }
        });
    } catch (error) {
        console.error('Get full user error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch user data' });
    }
});

// Update user profile
router.put('/users/:id/profile', async (req, res) => {
    try {
        const { firstName, lastName, email, phone, country } = req.body;

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { firstName, lastName, email, phone, country },
            { new: true, runValidators: true }
        ).select('-password -twoFactorSecret');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, user });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ success: false, message: 'Failed to update profile' });
    }
});

// Update user account settings
router.put('/users/:id/account', async (req, res) => {
    try {
        const { role, status, isVerified, kycStatus, twoFactorEnabled } = req.body;

        const updateData = {};
        if (role !== undefined) updateData.role = role;
        if (status !== undefined) updateData.status = status;
        if (isVerified !== undefined) updateData.isVerified = isVerified;
        if (kycStatus !== undefined) updateData.kycStatus = kycStatus;
        if (twoFactorEnabled !== undefined) updateData.twoFactorEnabled = twoFactorEnabled;

        const user = await User.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        ).select('-password -twoFactorSecret');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, user });
    } catch (error) {
        console.error('Update account error:', error);
        res.status(500).json({ success: false, message: 'Failed to update account' });
    }
});

// Update user wallet balance
router.put('/users/:id/wallet', async (req, res) => {
    try {
        const { balance, action, amount, description } = req.body;

        let wallet = await Wallet.findOne({ user: req.params.id });

        if (!wallet) {
            // Create wallet if it doesn't exist
            wallet = new Wallet({ user: req.params.id, balance: 0 });
        }

        let transactionType = 'bonus';
        let transactionAmount = 0;

        if (action === 'set') {
            // Set exact balance
            transactionAmount = balance - wallet.balance;
            wallet.balance = balance;
            if (transactionAmount > 0) {
                wallet.totalDeposited += transactionAmount;
            }
        } else if (action === 'add') {
            // Add to balance
            transactionAmount = amount;
            wallet.balance += amount;
            wallet.totalDeposited += amount;
        } else if (action === 'subtract') {
            // Subtract from balance
            transactionAmount = amount;
            wallet.balance -= amount;
            if (wallet.balance < 0) wallet.balance = 0;
            transactionType = 'refund';
        }

        await wallet.save();

        // Create transaction record
        const transaction = new Transaction({
            user: req.params.id,
            type: transactionType,
            amount: Math.abs(transactionAmount),
            status: 'completed',
            method: 'internal',
            description: description || `Admin ${action} - ${transactionType}`,
            processedAt: new Date(),
            processedBy: req.userId
        });
        await transaction.save();

        res.json({ success: true, wallet, transaction });
    } catch (error) {
        console.error('Update wallet error:', error);
        res.status(500).json({ success: false, message: 'Failed to update wallet' });
    }
});

// Create investment for user
router.post('/investments/create', async (req, res) => {
    try {
        const { userId, planId, amount, customProfit, customDuration } = req.body;

        const plan = await InvestmentPlan.findById(planId);
        if (!plan) {
            return res.status(404).json({ success: false, message: 'Investment plan not found' });
        }

        const wallet = await Wallet.findOne({ user: userId });
        if (!wallet) {
            return res.status(404).json({ success: false, message: 'User wallet not found' });
        }

        // Check if user has sufficient balance (optional - admin can override)
        const deductFromWallet = req.body.deductFromWallet !== false;

        if (deductFromWallet && wallet.balance < amount) {
            return res.status(400).json({ success: false, message: 'Insufficient wallet balance' });
        }

        const duration = customDuration || plan.duration;
        const maturityDate = new Date();
        maturityDate.setDate(maturityDate.getDate() + duration);

        const investment = new Investment({
            user: userId,
            plan: planId,
            planName: plan.name,
            amount,
            returnRate: plan.returnRate,
            duration,
            maturityDate,
            status: 'active',
            profit: customProfit || 0,
            progress: 0
        });

        await investment.save();

        // Deduct from wallet if requested
        if (deductFromWallet) {
            wallet.balance -= amount;
            await wallet.save();

            // Create transaction
            const transaction = new Transaction({
                user: userId,
                type: 'investment',
                amount,
                status: 'completed',
                method: 'internal',
                description: `Investment in ${plan.name}`,
                processedAt: new Date(),
                processedBy: req.userId
            });
            await transaction.save();
        }

        res.status(201).json({ success: true, investment });
    } catch (error) {
        console.error('Create investment error:', error);
        res.status(500).json({ success: false, message: 'Failed to create investment' });
    }
});

// Update investment
router.put('/investments/:id', async (req, res) => {
    try {
        const { amount, profit, status, progress, maturityDate } = req.body;

        const updateData = {};
        if (amount !== undefined) updateData.amount = amount;
        if (profit !== undefined) updateData.profit = profit;
        if (status !== undefined) updateData.status = status;
        if (progress !== undefined) updateData.progress = progress;
        if (maturityDate !== undefined) updateData.maturityDate = maturityDate;

        const investment = await Investment.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        ).populate('plan');

        if (!investment) {
            return res.status(404).json({ success: false, message: 'Investment not found' });
        }

        res.json({ success: true, investment });
    } catch (error) {
        console.error('Update investment error:', error);
        res.status(500).json({ success: false, message: 'Failed to update investment' });
    }
});

// Delete investment
router.delete('/investments/:id', async (req, res) => {
    try {
        const investment = await Investment.findByIdAndDelete(req.params.id);

        if (!investment) {
            return res.status(404).json({ success: false, message: 'Investment not found' });
        }

        res.json({ success: true, message: 'Investment deleted' });
    } catch (error) {
        console.error('Delete investment error:', error);
        res.status(500).json({ success: false, message: 'Failed to delete investment' });
    }
});

// Create manual transaction
router.post('/transactions/create', async (req, res) => {
    try {
        const { userId, type, amount, description, updateWallet } = req.body;

        const transaction = new Transaction({
            user: userId,
            type,
            amount,
            status: 'completed',
            method: 'internal',
            description: description || `Admin ${type}`,
            processedAt: new Date(),
            processedBy: req.userId
        });

        await transaction.save();

        // Update wallet if requested
        if (updateWallet !== false) {
            const wallet = await Wallet.findOne({ user: userId });
            if (wallet) {
                if (type === 'deposit' || type === 'bonus' || type === 'profit') {
                    wallet.balance += amount;
                    if (type === 'deposit') wallet.totalDeposited += amount;
                } else if (type === 'withdrawal' || type === 'refund') {
                    wallet.balance -= amount;
                    if (wallet.balance < 0) wallet.balance = 0;
                    if (type === 'withdrawal') wallet.totalWithdrawn += amount;
                }
                await wallet.save();
            }
        }

        res.status(201).json({ success: true, transaction });
    } catch (error) {
        console.error('Create transaction error:', error);
        res.status(500).json({ success: false, message: 'Failed to create transaction' });
    }
});

module.exports = router;

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

module.exports = router;

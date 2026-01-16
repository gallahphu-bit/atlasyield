const express = require('express');
const auth = require('../middleware/auth');
const Wallet = require('../models/Wallet');
const { Transaction } = require('../models/Wallet');

const router = express.Router();

// Get wallet
router.get('/', auth, async (req, res) => {
    try {
        let wallet = await Wallet.findOne({ user: req.userId });
        if (!wallet) {
            wallet = new Wallet({ user: req.userId });
            await wallet.save();
        }
        res.json({ success: true, wallet });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch wallet' });
    }
});

// Request deposit
router.post('/deposit', auth, async (req, res) => {
    try {
        const { amount, method } = req.body;

        if (amount < 10) {
            return res.status(400).json({ success: false, message: 'Minimum deposit is $10' });
        }

        const transaction = new Transaction({
            user: req.userId,
            type: 'deposit',
            amount,
            method,
            status: 'pending'
        });
        await transaction.save();

        res.status(201).json({
            success: true,
            message: 'Deposit initiated',
            transaction
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to initiate deposit' });
    }
});

// Request withdrawal
router.post('/withdraw', auth, async (req, res) => {
    try {
        const { amount, bankDetails } = req.body;

        const wallet = await Wallet.findOne({ user: req.userId });

        if (amount < 50) {
            return res.status(400).json({ success: false, message: 'Minimum withdrawal is $50' });
        }

        if (wallet.balance < amount) {
            return res.status(400).json({ success: false, message: 'Insufficient balance' });
        }

        // Add to pending withdrawals
        wallet.pendingWithdrawals += amount;
        await wallet.save();

        const transaction = new Transaction({
            user: req.userId,
            type: 'withdrawal',
            amount,
            fee: 5,
            method: 'bank_transfer',
            status: 'pending',
            metadata: bankDetails
        });
        await transaction.save();

        res.status(201).json({
            success: true,
            message: 'Withdrawal requested',
            transaction
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to request withdrawal' });
    }
});

// Get transactions
router.get('/transactions', auth, async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.userId })
            .sort({ createdAt: -1 })
            .limit(50);
        res.json({ success: true, transactions });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch transactions' });
    }
});

module.exports = router;

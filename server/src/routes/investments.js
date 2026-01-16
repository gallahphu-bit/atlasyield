const express = require('express');
const auth = require('../middleware/auth');
const { InvestmentPlan, Investment } = require('../models/Investment');
const Wallet = require('../models/Wallet');
const { Transaction } = require('../models/Wallet');

const router = express.Router();

// Get all investment plans
router.get('/plans', async (req, res) => {
    try {
        const plans = await InvestmentPlan.find({ isActive: true });
        res.json({ success: true, plans });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch plans' });
    }
});

// Get user's investments
router.get('/', auth, async (req, res) => {
    try {
        const investments = await Investment.find({ user: req.userId })
            .populate('plan')
            .sort({ createdAt: -1 });
        res.json({ success: true, investments });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch investments' });
    }
});

// Create new investment
router.post('/', auth, async (req, res) => {
    try {
        const { planId, amount } = req.body;

        const plan = await InvestmentPlan.findById(planId);
        if (!plan || !plan.isActive) {
            return res.status(400).json({ success: false, message: 'Invalid investment plan' });
        }

        if (amount < plan.minAmount || amount > plan.maxAmount) {
            return res.status(400).json({ success: false, message: 'Invalid investment amount' });
        }

        const wallet = await Wallet.findOne({ user: req.userId });
        if (wallet.balance < amount) {
            return res.status(400).json({ success: false, message: 'Insufficient balance' });
        }

        // Deduct from wallet
        wallet.balance -= amount;
        await wallet.save();

        // Create investment
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + plan.duration);

        const investment = new Investment({
            user: req.userId,
            plan: planId,
            amount,
            endDate
        });
        await investment.save();

        // Create transaction
        const transaction = new Transaction({
            user: req.userId,
            type: 'investment',
            amount,
            status: 'completed',
            description: `Investment in ${plan.name}`
        });
        await transaction.save();

        res.status(201).json({ success: true, investment });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to create investment' });
    }
});

// Get single investment
router.get('/:id', auth, async (req, res) => {
    try {
        const investment = await Investment.findOne({
            _id: req.params.id,
            user: req.userId
        }).populate('plan');

        if (!investment) {
            return res.status(404).json({ success: false, message: 'Investment not found' });
        }

        res.json({ success: true, investment });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch investment' });
    }
});

module.exports = router;

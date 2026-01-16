const mongoose = require('mongoose');

// Investment Plan Schema
const investmentPlanSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    minAmount: {
        type: Number,
        required: true,
        min: 0
    },
    maxAmount: {
        type: Number,
        required: true
    },
    duration: {
        type: Number, // in days, 0 = flexible
        required: true
    },
    returnRate: {
        type: Number, // percentage
        required: true
    },
    riskLevel: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium'
    },
    type: {
        type: String,
        enum: ['Fixed', 'Flexible'],
        default: 'Fixed'
    },
    features: [String],
    isActive: {
        type: Boolean,
        default: true
    },
    popular: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const InvestmentPlan = mongoose.model('InvestmentPlan', investmentPlanSchema);


// User Investment Schema
const investmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    plan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InvestmentPlan',
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ['active', 'completed', 'cancelled'],
        default: 'active'
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        required: true
    },
    currentValue: {
        type: Number,
        default: function () { return this.amount; }
    },
    profit: {
        type: Number,
        default: 0
    },
    lastProfitDate: Date
}, {
    timestamps: true
});

// Calculate progress
investmentSchema.virtual('progress').get(function () {
    const now = new Date();
    const total = this.endDate - this.startDate;
    const elapsed = now - this.startDate;
    return Math.min(100, Math.round((elapsed / total) * 100));
});

const Investment = mongoose.model('Investment', investmentSchema);

module.exports = { InvestmentPlan, Investment };

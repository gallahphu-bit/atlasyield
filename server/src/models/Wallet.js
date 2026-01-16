const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    balance: {
        type: Number,
        default: 0,
        min: 0
    },
    currency: {
        type: String,
        default: 'USD'
    },
    totalDeposited: {
        type: Number,
        default: 0
    },
    totalWithdrawn: {
        type: Number,
        default: 0
    },
    pendingWithdrawals: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Virtual for available balance
walletSchema.virtual('availableBalance').get(function () {
    return this.balance - this.pendingWithdrawals;
});

module.exports = mongoose.model('Wallet', walletSchema);


// Transaction Model
const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['deposit', 'withdrawal', 'investment', 'profit', 'bonus', 'refund'],
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    fee: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'completed', 'failed', 'cancelled'],
        default: 'pending'
    },
    method: {
        type: String,
        enum: ['bank_transfer', 'card', 'crypto', 'internal']
    },
    reference: {
        type: String,
        unique: true
    },
    description: String,
    metadata: {
        bankName: String,
        accountNumber: String,
        cryptoAddress: String,
        txHash: String
    },
    processedAt: Date,
    processedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

// Generate reference before saving
transactionSchema.pre('save', function (next) {
    if (!this.reference) {
        const prefix = this.type.toUpperCase().slice(0, 3);
        const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const random = Math.random().toString(36).slice(2, 8).toUpperCase();
        this.reference = `${prefix}-${date}-${random}`;
    }
    next();
});

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports.Transaction = Transaction;

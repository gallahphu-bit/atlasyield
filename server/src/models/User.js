const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    country: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'support'],
        default: 'user'
    },
    status: {
        type: String,
        enum: ['pending', 'active', 'suspended'],
        default: 'pending'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: String,
    verificationExpires: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    twoFactorEnabled: {
        type: Boolean,
        default: false
    },
    twoFactorSecret: String,
    kycStatus: {
        type: String,
        enum: ['pending', 'submitted', 'verified', 'rejected'],
        default: 'pending'
    },
    kycDocuments: {
        idDocument: {
            url: String,
            status: String,
            uploadedAt: Date
        },
        addressProof: {
            url: String,
            status: String,
            uploadedAt: Date
        },
        selfie: {
            url: String,
            status: String,
            uploadedAt: Date
        }
    },
    referralCode: String,
    referredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    lastLogin: Date,
    loginHistory: [{
        ip: String,
        userAgent: String,
        timestamp: Date
    }]
}, {
    timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Generate referral code
userSchema.pre('save', function (next) {
    if (!this.referralCode) {
        this.referralCode = this._id.toString().slice(-8).toUpperCase();
    }
    next();
});

module.exports = mongoose.model('User', userSchema);

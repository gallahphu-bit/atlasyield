require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const investmentRoutes = require('./routes/investments');
const walletRoutes = require('./routes/wallet');
const adminRoutes = require('./routes/admin');

const app = express();

// Middleware
const allowedOrigins = [
    process.env.CLIENT_URL,
    'https://atlasyiield.netlify.app',
    'http://localhost:3000',
    'http://localhost:5173'
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            return callback(null, true);
        }
        return callback(null, true); // Allow all for now
    },
    credentials: true
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/atlasyield')
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/investments', investmentRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;

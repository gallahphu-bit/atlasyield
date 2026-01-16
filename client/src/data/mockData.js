// Mock data for the AtlasYield platform

export const mockUser = {
    id: '1',
    email: 'demo@atlasyield.com',
    firstName: 'John',
    lastName: 'Investor',
    role: 'user',
    isVerified: true,
    twoFactorEnabled: false,
    kycStatus: 'verified',
    phone: '+1 (555) 123-4567',
    country: 'United States',
    createdAt: '2024-01-15T00:00:00Z'
}

export const mockWallet = {
    balance: 45750.00,
    currency: 'USD',
    totalDeposited: 50000.00,
    totalWithdrawn: 8500.00,
    pendingWithdrawals: 0,
    availableBalance: 45750.00
}

export const mockPortfolio = {
    totalValue: 52340.50,
    totalInvested: 45000.00,
    totalProfit: 7340.50,
    profitPercentage: 16.31,
    monthlyReturn: 2.4,
    activeInvestments: 3
}

export const mockInvestmentPlans = [
    {
        id: '1',
        name: 'Bronze Starter',
        description: 'Perfect entry point for new investors. Low risk with guaranteed principal protection.',
        minAmount: 50,
        maxAmount: 2500,
        duration: 14,
        returnRate: 3.5,
        riskLevel: 'Low',
        type: 'Fixed',
        features: ['Principal 100% protected', 'Daily interest accrual', '24/7 customer support', 'No hidden fees'],
        popular: false
    },
    {
        id: '2',
        name: 'Silver Growth',
        description: 'Ideal for steady growth. Balanced risk with reliable monthly returns.',
        minAmount: 500,
        maxAmount: 15000,
        duration: 30,
        returnRate: 8,
        riskLevel: 'Low',
        type: 'Fixed',
        features: ['Weekly profit payouts', 'Compound interest option', 'Early withdrawal (5% fee)', 'Email notifications'],
        popular: false
    },
    {
        id: '3',
        name: 'Gold Premium',
        description: 'Our most popular plan! Optimal balance of returns and security for serious investors.',
        minAmount: 2500,
        maxAmount: 75000,
        duration: 90,
        returnRate: 18,
        riskLevel: 'Medium',
        type: 'Fixed',
        features: ['Daily compounding', 'Priority withdrawals', 'Dedicated account manager', 'VIP support line', 'Bonus 2% on reinvestment'],
        popular: true
    },
    {
        id: '4',
        name: 'Platinum Elite',
        description: 'Premium returns for high-value investors. Exclusive perks and maximum earning potential.',
        minAmount: 10000,
        maxAmount: 250000,
        duration: 180,
        returnRate: 32,
        riskLevel: 'Medium',
        type: 'Fixed',
        features: ['Hourly compounding', 'Instant withdrawals', 'Private wealth advisor', 'Exclusive investment insights', 'Airport lounge access'],
        popular: false
    },
    {
        id: '5',
        name: 'Diamond Legacy',
        description: 'Build generational wealth. Our highest-yield plan for long-term financial freedom.',
        minAmount: 50000,
        maxAmount: 1000000,
        duration: 365,
        returnRate: 55,
        riskLevel: 'Medium',
        type: 'Fixed',
        features: ['Maximum returns', 'Estate planning support', 'Tax optimization advice', 'Quarterly luxury rewards', 'Exclusive investor events'],
        popular: false
    },
    {
        id: '6',
        name: 'Flex Savings',
        description: 'Withdraw anytime with no penalties. Perfect for emergency funds or short-term goals.',
        minAmount: 25,
        maxAmount: 50000,
        duration: 0,
        returnRate: 2.5,
        riskLevel: 'Low',
        type: 'Flexible',
        features: ['No lock-in period', 'Instant withdrawals', 'Daily interest credited', 'Start with just $25'],
        popular: false
    }
]

export const mockInvestments = [
    {
        id: '1',
        planId: '2',
        planName: 'Balanced Portfolio',
        amount: 25000,
        startDate: '2024-10-15T00:00:00Z',
        endDate: '2025-01-13T00:00:00Z',
        status: 'active',
        returnRate: 12,
        currentValue: 27500,
        profit: 2500,
        progress: 67
    },
    {
        id: '2',
        planId: '1',
        planName: 'Starter Growth',
        amount: 5000,
        startDate: '2024-12-01T00:00:00Z',
        endDate: '2024-12-31T00:00:00Z',
        status: 'active',
        returnRate: 5,
        currentValue: 5175,
        profit: 175,
        progress: 45
    },
    {
        id: '3',
        planId: '3',
        planName: 'Premium Yield',
        amount: 15000,
        startDate: '2024-08-01T00:00:00Z',
        endDate: '2025-01-28T00:00:00Z',
        status: 'active',
        returnRate: 25,
        currentValue: 17665.50,
        profit: 2665.50,
        progress: 78
    },
    {
        id: '4',
        planId: '2',
        planName: 'Balanced Portfolio',
        amount: 10000,
        startDate: '2024-05-01T00:00:00Z',
        endDate: '2024-07-30T00:00:00Z',
        status: 'completed',
        returnRate: 12,
        currentValue: 11200,
        profit: 1200,
        progress: 100
    }
]

export const mockTransactions = [
    {
        id: '1',
        type: 'deposit',
        amount: 25000,
        status: 'completed',
        date: '2024-10-14T10:30:00Z',
        method: 'Bank Transfer',
        reference: 'DEP-20241014-001'
    },
    {
        id: '2',
        type: 'investment',
        amount: 25000,
        status: 'completed',
        date: '2024-10-15T09:00:00Z',
        description: 'Invested in Balanced Portfolio',
        reference: 'INV-20241015-001'
    },
    {
        id: '3',
        type: 'profit',
        amount: 312.50,
        status: 'completed',
        date: '2024-10-22T00:00:00Z',
        description: 'Weekly profit from Balanced Portfolio',
        reference: 'PRF-20241022-001'
    },
    {
        id: '4',
        type: 'deposit',
        amount: 20000,
        status: 'completed',
        date: '2024-11-01T14:20:00Z',
        method: 'Crypto (BTC)',
        reference: 'DEP-20241101-001'
    },
    {
        id: '5',
        type: 'withdrawal',
        amount: 5000,
        status: 'completed',
        date: '2024-11-10T11:00:00Z',
        method: 'Bank Transfer',
        reference: 'WTH-20241110-001'
    },
    {
        id: '6',
        type: 'profit',
        amount: 625.00,
        status: 'completed',
        date: '2024-11-15T00:00:00Z',
        description: 'Weekly profit from Balanced Portfolio',
        reference: 'PRF-20241115-001'
    },
    {
        id: '7',
        type: 'investment',
        amount: 15000,
        status: 'completed',
        date: '2024-08-01T10:00:00Z',
        description: 'Invested in Premium Yield',
        reference: 'INV-20240801-001'
    },
    {
        id: '8',
        type: 'withdrawal',
        amount: 3500,
        status: 'pending',
        date: '2024-12-14T09:30:00Z',
        method: 'Bank Transfer',
        reference: 'WTH-20241214-001'
    }
]

export const mockChartData = [
    { month: 'Jul', value: 42000, profit: 800 },
    { month: 'Aug', value: 43500, profit: 1500 },
    { month: 'Sep', value: 44200, profit: 700 },
    { month: 'Oct', value: 46800, profit: 2600 },
    { month: 'Nov', value: 49500, profit: 2700 },
    { month: 'Dec', value: 52340, profit: 2840 }
]

export const mockNotifications = [
    {
        id: '1',
        type: 'profit',
        title: 'Profit Credited',
        message: 'Your weekly profit of $312.50 has been credited to your wallet.',
        read: false,
        date: '2024-12-14T00:00:00Z'
    },
    {
        id: '2',
        type: 'security',
        title: 'New Login Detected',
        message: 'A new login was detected from Chrome on Windows.',
        read: true,
        date: '2024-12-13T15:30:00Z'
    },
    {
        id: '3',
        type: 'withdrawal',
        title: 'Withdrawal Processing',
        message: 'Your withdrawal request of $3,500 is being processed.',
        read: false,
        date: '2024-12-14T09:30:00Z'
    }
]

// Admin mock data
export const mockAdminStats = {
    totalUsers: 12458,
    activeUsers: 8932,
    totalDeposits: 15750000,
    totalWithdrawals: 4280000,
    pendingWithdrawals: 125000,
    totalProfit: 890000,
    newUsersToday: 47,
    newDepositsToday: 285000
}

export const mockAdminUsers = [
    {
        id: '1',
        email: 'john.doe@email.com',
        firstName: 'John',
        lastName: 'Doe',
        status: 'active',
        kycStatus: 'verified',
        balance: 45750,
        totalInvested: 45000,
        joinedAt: '2024-01-15T00:00:00Z'
    },
    {
        id: '2',
        email: 'jane.smith@email.com',
        firstName: 'Jane',
        lastName: 'Smith',
        status: 'active',
        kycStatus: 'verified',
        balance: 128500,
        totalInvested: 100000,
        joinedAt: '2024-02-20T00:00:00Z'
    },
    {
        id: '3',
        email: 'mike.wilson@email.com',
        firstName: 'Mike',
        lastName: 'Wilson',
        status: 'pending',
        kycStatus: 'pending',
        balance: 5000,
        totalInvested: 0,
        joinedAt: '2024-12-10T00:00:00Z'
    },
    {
        id: '4',
        email: 'sarah.jones@email.com',
        firstName: 'Sarah',
        lastName: 'Jones',
        status: 'suspended',
        kycStatus: 'rejected',
        balance: 0,
        totalInvested: 0,
        joinedAt: '2024-06-05T00:00:00Z'
    }
]

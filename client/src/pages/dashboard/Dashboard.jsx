import {
    TrendingUp,
    TrendingDown,
    Wallet,
    PiggyBank,
    BarChart3,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    CheckCircle2,
    ExternalLink
} from 'lucide-react'
import { Link } from 'react-router-dom'
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts'
import { mockPortfolio, mockWallet, mockInvestments, mockTransactions, mockChartData } from '../../data/mockData'
import './Dashboard.css'

function Dashboard() {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(amount)
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
    }

    const activeInvestments = mockInvestments.filter(inv => inv.status === 'active')
    const recentTransactions = mockTransactions.slice(0, 5)

    return (
        <div className="dashboard-page fade-in">
            {/* Welcome Section */}
            <div className="welcome-section">
                <div>
                    <h1 className="welcome-title">Welcome back, John! 👋</h1>
                    <p className="welcome-subtitle">Here's what's happening with your investments today.</p>
                </div>
                <Link to="/investments/plans" className="btn btn-primary">
                    <TrendingUp size={18} />
                    New Investment
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
                <div className="stat-card stat-card-primary">
                    <div className="stat-card-header">
                        <div className="stat-card-icon" style={{ background: 'var(--primary-glow)' }}>
                            <Wallet size={24} style={{ color: 'var(--primary)' }} />
                        </div>
                        <span className="stat-card-change positive">
                            <ArrowUpRight size={16} />
                            +12.5%
                        </span>
                    </div>
                    <span className="stat-card-value">{formatCurrency(mockPortfolio.totalValue)}</span>
                    <span className="stat-card-label">Total Portfolio Value</span>
                </div>

                <div className="stat-card">
                    <div className="stat-card-header">
                        <div className="stat-card-icon" style={{ background: 'var(--success-bg)' }}>
                            <TrendingUp size={24} style={{ color: 'var(--success)' }} />
                        </div>
                        <span className="stat-card-change positive">
                            <ArrowUpRight size={16} />
                            +{mockPortfolio.profitPercentage}%
                        </span>
                    </div>
                    <span className="stat-card-value">{formatCurrency(mockPortfolio.totalProfit)}</span>
                    <span className="stat-card-label">Total Profit</span>
                </div>

                <div className="stat-card">
                    <div className="stat-card-header">
                        <div className="stat-card-icon" style={{ background: 'var(--info-bg)' }}>
                            <PiggyBank size={24} style={{ color: 'var(--info)' }} />
                        </div>
                    </div>
                    <span className="stat-card-value">{formatCurrency(mockWallet.balance)}</span>
                    <span className="stat-card-label">Wallet Balance</span>
                </div>

                <div className="stat-card">
                    <div className="stat-card-header">
                        <div className="stat-card-icon" style={{ background: 'var(--warning-bg)' }}>
                            <BarChart3 size={24} style={{ color: 'var(--warning)' }} />
                        </div>
                    </div>
                    <span className="stat-card-value">{mockPortfolio.activeInvestments}</span>
                    <span className="stat-card-label">Active Investments</span>
                </div>
            </div>

            {/* Chart & Investments Grid */}
            <div className="dashboard-grid">
                {/* Portfolio Chart */}
                <div className="chart-card card">
                    <div className="card-header">
                        <h3>Portfolio Performance</h3>
                        <div className="chart-legend">
                            <span className="legend-item">
                                <span className="legend-dot" style={{ background: 'var(--primary)' }} />
                                Portfolio Value
                            </span>
                        </div>
                    </div>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={mockChartData}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                                <XAxis
                                    dataKey="month"
                                    stroke="var(--text-muted)"
                                    tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
                                />
                                <YAxis
                                    stroke="var(--text-muted)"
                                    tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
                                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                                />
                                <Tooltip
                                    contentStyle={{
                                        background: 'var(--bg-card)',
                                        border: '1px solid var(--border-color)',
                                        borderRadius: 'var(--radius-md)',
                                        color: 'var(--text-primary)'
                                    }}
                                    formatter={(value) => [formatCurrency(value), 'Value']}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="var(--primary)"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorValue)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Active Investments */}
                <div className="investments-card card">
                    <div className="card-header">
                        <h3>Active Investments</h3>
                        <Link to="/investments/my-investments" className="card-link">
                            View All <ExternalLink size={14} />
                        </Link>
                    </div>
                    <div className="investments-list">
                        {activeInvestments.map(investment => (
                            <div key={investment.id} className="investment-item">
                                <div className="investment-info">
                                    <span className="investment-name">{investment.planName}</span>
                                    <span className="investment-amount">{formatCurrency(investment.amount)}</span>
                                </div>
                                <div className="investment-progress-container">
                                    <div className="progress-bar">
                                        <div
                                            className="progress-fill"
                                            style={{ width: `${investment.progress}%` }}
                                        />
                                    </div>
                                    <span className="progress-text">{investment.progress}% complete</span>
                                </div>
                                <div className="investment-stats">
                                    <span className="investment-profit positive">
                                        +{formatCurrency(investment.profit)}
                                    </span>
                                    <span className="investment-rate">+{investment.returnRate}% ROI</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="transactions-section card">
                <div className="card-header">
                    <h3>Recent Transactions</h3>
                    <Link to="/wallet/transactions" className="card-link">
                        View All <ExternalLink size={14} />
                    </Link>
                </div>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Reference</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentTransactions.map(transaction => (
                                <tr key={transaction.id}>
                                    <td>
                                        <div className="transaction-type">
                                            <span className={`transaction-icon ${transaction.type}`}>
                                                {transaction.type === 'deposit' && <ArrowDownRight size={16} />}
                                                {transaction.type === 'withdrawal' && <ArrowUpRight size={16} />}
                                                {transaction.type === 'investment' && <TrendingUp size={16} />}
                                                {transaction.type === 'profit' && <TrendingUp size={16} />}
                                            </span>
                                            <span className="transaction-label">
                                                {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={transaction.type === 'withdrawal' ? 'negative' : 'positive'}>
                                            {transaction.type === 'withdrawal' ? '-' : '+'}
                                            {formatCurrency(transaction.amount)}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`badge badge-${transaction.status === 'completed' ? 'success' : transaction.status === 'pending' ? 'warning' : 'danger'}`}>
                                            {transaction.status === 'completed' && <CheckCircle2 size={12} />}
                                            {transaction.status === 'pending' && <Clock size={12} />}
                                            {transaction.status}
                                        </span>
                                    </td>
                                    <td>{formatDate(transaction.date)}</td>
                                    <td className="text-muted">{transaction.reference}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Dashboard

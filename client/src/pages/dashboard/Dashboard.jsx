import { useState, useEffect } from 'react'
import {
    TrendingUp,
    TrendingDown,
    Wallet,
    PiggyBank,
    BarChart3,
    ArrowUpRight,
    ArrowDownRight,
    History,
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
import { useAuth } from '../../context/AuthContext'
import axios from 'axios'
import './Dashboard.css'

const API_URL = import.meta.env.VITE_API_URL || '/api'

function Dashboard() {
    const { user } = useAuth()
    const [wallet, setWallet] = useState(null)
    const [investments, setInvestments] = useState([])
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchDashboardData()
    }, [])

    const fetchDashboardData = async () => {
        try {
            const token = localStorage.getItem('token')
            const config = { headers: { Authorization: `Bearer ${token}` } }

            const [walletRes, investmentsRes, transactionsRes] = await Promise.all([
                axios.get(`${API_URL}/wallet`, config),
                axios.get(`${API_URL}/investments`, config),
                axios.get(`${API_URL}/wallet/transactions`, config)
            ])

            setWallet(walletRes.data.wallet || { balance: 0, totalDeposited: 0, totalWithdrawn: 0 })
            setInvestments(investmentsRes.data.investments || [])
            setTransactions(transactionsRes.data.transactions || [])
        } catch (error) {
            console.error('Error fetching dashboard data:', error)
            // Set default empty values on error
            setWallet({ balance: 0, totalDeposited: 0, totalWithdrawn: 0 })
            setInvestments([])
            setTransactions([])
        } finally {
            setLoading(false)
        }
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(amount || 0)
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
    }

    // Calculate portfolio stats from real data
    const activeInvestments = investments.filter(inv => inv.status === 'active')
    const totalInvested = activeInvestments.reduce((sum, inv) => sum + (inv.amount || 0), 0)
    const totalProfit = activeInvestments.reduce((sum, inv) => sum + (inv.profit || 0), 0)
    const totalValue = totalInvested + totalProfit
    const profitPercentage = totalInvested > 0 ? ((totalProfit / totalInvested) * 100).toFixed(2) : 0

    const recentTransactions = transactions.slice(0, 5)

    if (loading) {
        return (
            <div className="dashboard-page fade-in">
                <div style={{ textAlign: 'center', padding: '4rem' }}>
                    <div className="loader" style={{ margin: '0 auto' }} />
                    <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Loading dashboard...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="dashboard-page fade-in">
            {/* Welcome Section */}
            <div className="welcome-section">
                <div>
                    <h1 className="welcome-title">Welcome back, {user?.firstName || 'User'}! 👋</h1>
                    <p className="welcome-subtitle">Here's what's happening with your investments today.</p>
                </div>
                <div className="welcome-actions">
                    <Link
                        to="/wallet/withdraw"
                        className={`btn btn-secondary ${(wallet?.balance || 0) <= 0 ? 'btn-disabled' : ''}`}
                        onClick={(e) => (wallet?.balance || 0) <= 0 && e.preventDefault()}
                    >
                        <ArrowUpRight size={18} />
                        Withdraw
                    </Link>
                    <Link to="/investments/plans" className="btn btn-primary">
                        <TrendingUp size={18} />
                        New Investment
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
                <div className={`stat-card stat-card-primary ${totalValue === 0 ? 'zero-value' : ''}`}>
                    <div className="stat-card-header">
                        <div className="stat-card-icon" style={{ background: 'var(--primary-glow)' }}>
                            <Wallet size={24} style={{ color: 'var(--primary)' }} />
                        </div>
                        {profitPercentage > 0 && (
                            <span className="stat-card-change positive">
                                <ArrowUpRight size={16} />
                                +{profitPercentage}%
                            </span>
                        )}
                    </div>
                    <span className="stat-card-value">{formatCurrency(totalValue)}</span>
                    <span className="stat-card-label">Total Portfolio Value</span>
                </div>

                <div className={`stat-card ${totalProfit === 0 ? 'zero-value' : ''}`}>
                    <div className="stat-card-header">
                        <div className="stat-card-icon" style={{ background: 'var(--success-bg)' }}>
                            <TrendingUp size={24} style={{ color: 'var(--success)' }} />
                        </div>
                        {profitPercentage > 0 && (
                            <span className="stat-card-change positive">
                                <ArrowUpRight size={16} />
                                +{profitPercentage}%
                            </span>
                        )}
                    </div>
                    <span className="stat-card-value">{formatCurrency(totalProfit)}</span>
                    <span className="stat-card-label">Total Profit</span>
                </div>

                <div className={`stat-card ${(wallet?.balance || 0) === 0 ? 'zero-value' : ''}`}>
                    <div className="stat-card-header">
                        <div className="stat-card-icon" style={{ background: 'var(--info-bg)' }}>
                            <PiggyBank size={24} style={{ color: 'var(--info)' }} />
                        </div>
                    </div>
                    <span className="stat-card-value">{formatCurrency(wallet?.balance || 0)}</span>
                    <span className="stat-card-label">Wallet Balance</span>
                </div>

                <div className={`stat-card ${activeInvestments.length === 0 ? 'zero-value' : ''}`}>
                    <div className="stat-card-header">
                        <div className="stat-card-icon" style={{ background: 'var(--warning-bg)' }}>
                            <BarChart3 size={24} style={{ color: 'var(--warning)' }} />
                        </div>
                    </div>
                    <span className="stat-card-value">{activeInvestments.length}</span>
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
                        {activeInvestments.length > 0 ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart data={[
                                    { month: 'Start', value: totalInvested },
                                    { month: 'Current', value: totalValue }
                                ]}>
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
                        ) : (
                            <div className="empty-chart-state">
                                <div className="empty-state-icon-wrapper">
                                    <BarChart3 size={48} className="pulse-icon" />
                                </div>
                                <div className="empty-state-content">
                                    <h4>No Active Performance</h4>
                                    <p>Your investment progress will be graphed here once you start a plan.</p>
                                    <Link to="/investments/plans" className="btn btn-sm btn-outline">Explore Plans</Link>
                                </div>
                            </div>
                        )}
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
                        {activeInvestments.length > 0 ? (
                            activeInvestments.map(investment => (
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
                            ))
                        ) : (
                            <div className="empty-investments-minimal">
                                <TrendingUp size={24} className="text-muted" />
                                <p>No active plans</p>
                            </div>
                        )}
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

                {recentTransactions.length > 0 ? (
                    <>
                        {/* Desktop Table */}
                        <div className="table-container desktop-only">
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

                        {/* Mobile Card View */}
                        <div className="mobile-only transaction-cards">
                            {recentTransactions.map(transaction => (
                                <div key={transaction.id} className="transaction-mobile-card">
                                    <div className="tmc-header">
                                        <div className="tmc-type">
                                            <div className={`transaction-icon sm ${transaction.type}`}>
                                                {transaction.type === 'deposit' && <ArrowDownRight size={14} />}
                                                {transaction.type === 'withdrawal' && <ArrowUpRight size={14} />}
                                                {(transaction.type === 'investment' || transaction.type === 'profit') && <TrendingUp size={14} />}
                                            </div>
                                            <span>{transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}</span>
                                        </div>
                                        <span className={`badge badge-sm badge-${transaction.status === 'completed' ? 'success' : transaction.status === 'pending' ? 'warning' : 'danger'}`}>
                                            {transaction.status}
                                        </span>
                                    </div>
                                    <div className="tmc-body">
                                        <div className="tmc-amount">
                                            <span className={transaction.type === 'withdrawal' ? 'negative' : 'positive'}>
                                                {transaction.type === 'withdrawal' ? '-' : '+'}
                                                {formatCurrency(transaction.amount)}
                                            </span>
                                            <span className="tmc-date">{formatDate(transaction.date)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="empty-transactions-state">
                        <History size={40} className="text-muted" />
                        <p>No transactions yet</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Dashboard

import {
    Users,
    DollarSign,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    CheckCircle
} from 'lucide-react'
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar
} from 'recharts'
import { mockAdminStats } from '../../data/mockData'
import '../dashboard/Dashboard.css'

function AdminDashboard() {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            notation: amount >= 1000000 ? 'compact' : 'standard'
        }).format(amount)
    }

    const chartData = [
        { month: 'Jul', deposits: 1200000, withdrawals: 450000 },
        { month: 'Aug', deposits: 1450000, withdrawals: 520000 },
        { month: 'Sep', deposits: 1380000, withdrawals: 480000 },
        { month: 'Oct', deposits: 1650000, withdrawals: 610000 },
        { month: 'Nov', deposits: 1890000, withdrawals: 720000 },
        { month: 'Dec', deposits: 2100000, withdrawals: 850000 }
    ]

    return (
        <div className="dashboard-page fade-in">
            <div className="welcome-section">
                <div>
                    <h1>Admin Dashboard</h1>
                    <p className="welcome-subtitle">Platform overview and analytics</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-card-header">
                        <div className="stat-card-icon" style={{ background: 'var(--primary-glow)' }}>
                            <Users size={24} style={{ color: 'var(--primary)' }} />
                        </div>
                        <span className="stat-card-change positive">
                            <ArrowUpRight size={16} />
                            +{mockAdminStats.newUsersToday} today
                        </span>
                    </div>
                    <span className="stat-card-value">{mockAdminStats.totalUsers.toLocaleString()}</span>
                    <span className="stat-card-label">Total Users</span>
                </div>

                <div className="stat-card">
                    <div className="stat-card-header">
                        <div className="stat-card-icon" style={{ background: 'var(--success-bg)' }}>
                            <DollarSign size={24} style={{ color: 'var(--success)' }} />
                        </div>
                    </div>
                    <span className="stat-card-value">{formatCurrency(mockAdminStats.totalDeposits)}</span>
                    <span className="stat-card-label">Total Deposits</span>
                </div>

                <div className="stat-card">
                    <div className="stat-card-header">
                        <div className="stat-card-icon" style={{ background: 'var(--info-bg)' }}>
                            <ArrowUpRight size={24} style={{ color: 'var(--info)' }} />
                        </div>
                    </div>
                    <span className="stat-card-value">{formatCurrency(mockAdminStats.totalWithdrawals)}</span>
                    <span className="stat-card-label">Total Withdrawals</span>
                </div>

                <div className="stat-card">
                    <div className="stat-card-header">
                        <div className="stat-card-icon" style={{ background: 'var(--warning-bg)' }}>
                            <Clock size={24} style={{ color: 'var(--warning)' }} />
                        </div>
                    </div>
                    <span className="stat-card-value">{formatCurrency(mockAdminStats.pendingWithdrawals)}</span>
                    <span className="stat-card-label">Pending Withdrawals</span>
                </div>
            </div>

            {/* Charts */}
            <div className="dashboard-grid">
                <div className="chart-card card">
                    <div className="card-header">
                        <h3>Deposits vs Withdrawals</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                            <XAxis dataKey="month" stroke="var(--text-muted)" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                            <YAxis stroke="var(--text-muted)" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`} />
                            <Tooltip
                                contentStyle={{
                                    background: 'var(--bg-card)',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: 'var(--radius-md)'
                                }}
                                formatter={(value) => formatCurrency(value)}
                            />
                            <Bar dataKey="deposits" fill="var(--success)" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="withdrawals" fill="var(--info)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="investments-card card">
                    <div className="card-header">
                        <h3>Quick Stats</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                        <div style={{ padding: 'var(--space-md)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)', marginBottom: 'var(--space-xs)' }}>Active Users (30d)</p>
                            <p style={{ fontSize: 'var(--font-size-xl)', fontWeight: 600 }}>{mockAdminStats.activeUsers.toLocaleString()}</p>
                        </div>
                        <div style={{ padding: 'var(--space-md)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)', marginBottom: 'var(--space-xs)' }}>Platform Profit</p>
                            <p style={{ fontSize: 'var(--font-size-xl)', fontWeight: 600, color: 'var(--success)' }}>{formatCurrency(mockAdminStats.totalProfit)}</p>
                        </div>
                        <div style={{ padding: 'var(--space-md)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)', marginBottom: 'var(--space-xs)' }}>Today's Deposits</p>
                            <p style={{ fontSize: 'var(--font-size-xl)', fontWeight: 600 }}>{formatCurrency(mockAdminStats.newDepositsToday)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard

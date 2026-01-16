import {
    PieChart,
    TrendingUp,
    TrendingDown,
    ArrowUpRight,
    DollarSign
} from 'lucide-react'
import {
    PieChart as RechartsPie,
    Pie,
    Cell,
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from 'recharts'
import { mockPortfolio, mockInvestments, mockChartData } from '../../data/mockData'
import '../dashboard/Dashboard.css'

function Portfolio() {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount)
    }

    // Allocation data for pie chart
    const allocationData = mockInvestments
        .filter(inv => inv.status === 'active')
        .map(inv => ({
            name: inv.planName,
            value: inv.amount
        }))

    const COLORS = ['#22c997', '#0ea5e9', '#f59e0b', '#8b5cf6']

    return (
        <div className="dashboard-page fade-in">
            <div className="welcome-section">
                <div>
                    <h1 className="welcome-title">Portfolio Overview</h1>
                    <p className="welcome-subtitle">Track your investment performance and allocation</p>
                </div>
            </div>

            {/* Stats */}
            <div className="stats-grid">
                <div className="stat-card stat-card-primary">
                    <div className="stat-card-header">
                        <div className="stat-card-icon" style={{ background: 'var(--primary-glow)' }}>
                            <DollarSign size={24} style={{ color: 'var(--primary)' }} />
                        </div>
                        <span className="stat-card-change positive">
                            <ArrowUpRight size={16} />
                            +{mockPortfolio.profitPercentage}%
                        </span>
                    </div>
                    <span className="stat-card-value">{formatCurrency(mockPortfolio.totalValue)}</span>
                    <span className="stat-card-label">Total Portfolio Value</span>
                </div>

                <div className="stat-card">
                    <div className="stat-card-header">
                        <div className="stat-card-icon" style={{ background: 'var(--info-bg)' }}>
                            <PieChart size={24} style={{ color: 'var(--info)' }} />
                        </div>
                    </div>
                    <span className="stat-card-value">{formatCurrency(mockPortfolio.totalInvested)}</span>
                    <span className="stat-card-label">Total Invested</span>
                </div>

                <div className="stat-card">
                    <div className="stat-card-header">
                        <div className="stat-card-icon" style={{ background: 'var(--success-bg)' }}>
                            <TrendingUp size={24} style={{ color: 'var(--success)' }} />
                        </div>
                    </div>
                    <span className="stat-card-value">{formatCurrency(mockPortfolio.totalProfit)}</span>
                    <span className="stat-card-label">Total Profit</span>
                </div>

                <div className="stat-card">
                    <div className="stat-card-header">
                        <div className="stat-card-icon" style={{ background: 'var(--warning-bg)' }}>
                            <TrendingUp size={24} style={{ color: 'var(--warning)' }} />
                        </div>
                    </div>
                    <span className="stat-card-value">{mockPortfolio.monthlyReturn}%</span>
                    <span className="stat-card-label">Monthly Return</span>
                </div>
            </div>

            {/* Charts Grid */}
            <div className="dashboard-grid">
                {/* Performance Chart */}
                <div className="chart-card card">
                    <div className="card-header">
                        <h3>Performance History</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={mockChartData}>
                            <defs>
                                <linearGradient id="portfolioGrad" x1="0" y1="0" x2="0" y2="1">
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
                                    borderRadius: 'var(--radius-md)'
                                }}
                                formatter={(value) => [formatCurrency(value), 'Value']}
                            />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="var(--primary)"
                                strokeWidth={2}
                                fill="url(#portfolioGrad)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Allocation Chart */}
                <div className="investments-card card">
                    <div className="card-header">
                        <h3>Asset Allocation</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={250}>
                        <RechartsPie>
                            <Pie
                                data={allocationData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={90}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {allocationData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    background: 'var(--bg-card)',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: 'var(--radius-md)'
                                }}
                                formatter={(value) => formatCurrency(value)}
                            />
                        </RechartsPie>
                    </ResponsiveContainer>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-md)', justifyContent: 'center' }}>
                        {allocationData.map((item, index) => (
                            <div key={index} className="legend-item">
                                <span className="legend-dot" style={{ background: COLORS[index % COLORS.length] }} />
                                {item.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Portfolio

import { Link } from 'react-router-dom'
import {
    TrendingUp,
    Clock,
    CheckCircle2,
    ExternalLink,
    Calendar
} from 'lucide-react'
import { mockInvestments } from '../../data/mockData'
import '../dashboard/Dashboard.css'

function MyInvestments() {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
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
    const completedInvestments = mockInvestments.filter(inv => inv.status === 'completed')

    return (
        <div className="dashboard-page fade-in">
            <div className="welcome-section">
                <div>
                    <h1>My Investments</h1>
                    <p className="welcome-subtitle">Track and manage your active and completed investments</p>
                </div>
                <Link to="/investments/plans" className="btn btn-primary">
                    <TrendingUp size={18} />
                    New Investment
                </Link>
            </div>

            {/* Active Investments */}
            <div className="card" style={{ padding: 'var(--space-xl)' }}>
                <div className="card-header">
                    <h3>Active Investments ({activeInvestments.length})</h3>
                </div>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Plan</th>
                                <th>Amount</th>
                                <th>Current Value</th>
                                <th>Profit</th>
                                <th>Progress</th>
                                <th>Maturity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activeInvestments.map(investment => (
                                <tr key={investment.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                                            <div style={{
                                                width: 40,
                                                height: 40,
                                                borderRadius: 'var(--radius-md)',
                                                background: 'var(--primary-glow)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <TrendingUp size={20} style={{ color: 'var(--primary)' }} />
                                            </div>
                                            <div>
                                                <span style={{ fontWeight: 500 }}>{investment.planName}</span>
                                                <span style={{ display: 'block', fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
                                                    +{investment.returnRate}% ROI
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ fontWeight: 500 }}>{formatCurrency(investment.amount)}</td>
                                    <td style={{ fontWeight: 500, color: 'var(--primary)' }}>
                                        {formatCurrency(investment.currentValue)}
                                    </td>
                                    <td>
                                        <span className="positive">+{formatCurrency(investment.profit)}</span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', minWidth: 120 }}>
                                            <div className="progress-bar" style={{ flex: 1 }}>
                                                <div className="progress-fill" style={{ width: `${investment.progress}%` }} />
                                            </div>
                                            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
                                                {investment.progress}%
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', color: 'var(--text-secondary)' }}>
                                            <Calendar size={14} />
                                            {formatDate(investment.endDate)}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Completed Investments */}
            <div className="card" style={{ padding: 'var(--space-xl)' }}>
                <div className="card-header">
                    <h3>Completed Investments ({completedInvestments.length})</h3>
                </div>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Plan</th>
                                <th>Amount</th>
                                <th>Final Value</th>
                                <th>Profit</th>
                                <th>Status</th>
                                <th>Completed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {completedInvestments.map(investment => (
                                <tr key={investment.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                                            <div style={{
                                                width: 40,
                                                height: 40,
                                                borderRadius: 'var(--radius-md)',
                                                background: 'var(--success-bg)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <CheckCircle2 size={20} style={{ color: 'var(--success)' }} />
                                            </div>
                                            <span style={{ fontWeight: 500 }}>{investment.planName}</span>
                                        </div>
                                    </td>
                                    <td>{formatCurrency(investment.amount)}</td>
                                    <td style={{ fontWeight: 500 }}>{formatCurrency(investment.currentValue)}</td>
                                    <td>
                                        <span className="positive">+{formatCurrency(investment.profit)}</span>
                                    </td>
                                    <td>
                                        <span className="badge badge-success">
                                            <CheckCircle2 size={12} />
                                            Completed
                                        </span>
                                    </td>
                                    <td>{formatDate(investment.endDate)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default MyInvestments

import { useState } from 'react'
import { Plus, Edit2, Trash2, TrendingUp, Clock, Shield } from 'lucide-react'
import { mockInvestmentPlans } from '../../data/mockData'
import { useNotification } from '../../context/NotificationContext'
import '../dashboard/Dashboard.css'

function AdminPlans() {
    const { success } = useNotification()
    const [plans, setPlans] = useState(mockInvestmentPlans)

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount)
    }

    const handleDelete = (id) => {
        setPlans(plans.filter(p => p.id !== id))
        success('Plan deleted successfully')
    }

    return (
        <div className="dashboard-page fade-in">
            <div className="welcome-section">
                <div>
                    <h1>Investment Plans</h1>
                    <p className="welcome-subtitle">Manage investment plans and rates</p>
                </div>
                <button className="btn btn-primary">
                    <Plus size={18} />
                    Create Plan
                </button>
            </div>

            <div style={{ display: 'grid', gap: 'var(--space-lg)' }}>
                {plans.map(plan => (
                    <div key={plan.id} className="card" style={{ padding: 'var(--space-xl)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-sm)' }}>
                                    <h3>{plan.name}</h3>
                                    {plan.popular && <span className="badge badge-success">Popular</span>}
                                    <span className={`badge badge-${plan.riskLevel === 'Low' ? 'success' : plan.riskLevel === 'Medium' ? 'warning' : 'danger'}`}>
                                        {plan.riskLevel} Risk
                                    </span>
                                </div>
                                <p style={{ color: 'var(--text-muted)', marginBottom: 'var(--space-lg)' }}>{plan.description}</p>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 'var(--space-lg)' }}>
                                    <div>
                                        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', marginBottom: 'var(--space-xs)' }}>Return Rate</p>
                                        <p style={{ fontSize: 'var(--font-size-xl)', fontWeight: 600, color: 'var(--primary)' }}>{plan.returnRate}%</p>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', marginBottom: 'var(--space-xs)' }}>Duration</p>
                                        <p style={{ fontWeight: 500 }}>{plan.duration === 0 ? 'Flexible' : `${plan.duration} days`}</p>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', marginBottom: 'var(--space-xs)' }}>Min Investment</p>
                                        <p style={{ fontWeight: 500 }}>{formatCurrency(plan.minAmount)}</p>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', marginBottom: 'var(--space-xs)' }}>Max Investment</p>
                                        <p style={{ fontWeight: 500 }}>{formatCurrency(plan.maxAmount)}</p>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                                <button className="btn btn-secondary btn-sm">
                                    <Edit2 size={16} />
                                    Edit
                                </button>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(plan.id)}>
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminPlans

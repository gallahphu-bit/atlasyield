import { Link } from 'react-router-dom'
import {
    TrendingUp,
    Clock,
    Shield,
    Zap,
    Star,
    ArrowRight,
    Check
} from 'lucide-react'
import { mockInvestmentPlans } from '../../data/mockData'
import './Plans.css'

function Plans() {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        }).format(amount)
    }

    const getRiskColor = (risk) => {
        switch (risk) {
            case 'Low': return 'var(--success)'
            case 'Medium': return 'var(--warning)'
            case 'High': return 'var(--danger)'
            default: return 'var(--text-muted)'
        }
    }

    return (
        <div className="plans-page fade-in">
            <div className="plans-header">
                <div>
                    <h1>Investment Plans</h1>
                    <p>Choose the perfect plan that matches your investment goals</p>
                </div>
            </div>

            <div className="plans-grid">
                {mockInvestmentPlans.map(plan => (
                    <div key={plan.id} className={`plan-card ${plan.popular ? 'plan-popular' : ''}`}>
                        {plan.popular && (
                            <div className="popular-badge">
                                <Star size={14} />
                                Most Popular
                            </div>
                        )}

                        <div className="plan-header">
                            <h3 className="plan-name">{plan.name}</h3>
                            <p className="plan-description">{plan.description}</p>
                        </div>

                        <div className="plan-rate">
                            <span className="rate-value">{plan.returnRate}%</span>
                            <span className="rate-label">
                                {plan.type === 'Flexible' ? 'Annual Return' : 'Total Return'}
                            </span>
                        </div>

                        <div className="plan-details">
                            <div className="detail-item">
                                <Clock size={18} />
                                <span>
                                    {plan.duration === 0 ? 'Flexible' : `${plan.duration} days`}
                                </span>
                            </div>
                            <div className="detail-item">
                                <TrendingUp size={18} />
                                <span>{formatCurrency(plan.minAmount)} - {formatCurrency(plan.maxAmount)}</span>
                            </div>
                            <div className="detail-item">
                                <Shield size={18} />
                                <span style={{ color: getRiskColor(plan.riskLevel) }}>
                                    {plan.riskLevel} Risk
                                </span>
                            </div>
                            <div className="detail-item">
                                <Zap size={18} />
                                <span>{plan.type}</span>
                            </div>
                        </div>

                        <ul className="plan-features">
                            {plan.features.map((feature, index) => (
                                <li key={index}>
                                    <Check size={16} style={{ color: 'var(--primary)' }} />
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <Link
                            to={`/investments/new/${plan.id}`}
                            className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'} btn-lg`}
                            style={{ width: '100%' }}
                        >
                            Invest Now
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Plans

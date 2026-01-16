import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
    ArrowLeft,
    TrendingUp,
    Shield,
    Clock,
    Check,
    AlertCircle,
    Wallet
} from 'lucide-react'
import { mockInvestmentPlans, mockWallet } from '../../data/mockData'
import { useNotification } from '../../context/NotificationContext'
import './NewInvestment.css'

function NewInvestment() {
    const { planId } = useParams()
    const navigate = useNavigate()
    const { success, error: showError } = useNotification()

    const plan = mockInvestmentPlans.find(p => p.id === planId)
    const [amount, setAmount] = useState('')
    const [loading, setLoading] = useState(false)
    const [agreed, setAgreed] = useState(false)

    if (!plan) {
        return (
            <div className="empty-state">
                <AlertCircle size={48} />
                <h3>Plan Not Found</h3>
                <p>The investment plan you're looking for doesn't exist.</p>
                <Link to="/investments/plans" className="btn btn-primary">
                    View All Plans
                </Link>
            </div>
        )
    }

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        }).format(value)
    }

    const numericAmount = parseFloat(amount) || 0
    const isValidAmount = numericAmount >= plan.minAmount && numericAmount <= plan.maxAmount
    const hasBalance = numericAmount <= mockWallet.balance
    const expectedReturn = (numericAmount * plan.returnRate) / 100
    const finalValue = numericAmount + expectedReturn

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!isValidAmount || !hasBalance || !agreed) return

        setLoading(true)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000))

        success(`Successfully invested ${formatCurrency(numericAmount)} in ${plan.name}!`)
        navigate('/investments/my-investments')
    }

    return (
        <div className="new-investment-page fade-in">
            <Link to="/investments/plans" className="back-link">
                <ArrowLeft size={20} />
                Back to Plans
            </Link>

            <div className="investment-grid">
                {/* Investment Form */}
                <div className="investment-form-card card">
                    <h2>Invest in {plan.name}</h2>
                    <p className="text-secondary" style={{ marginBottom: 'var(--space-xl)' }}>
                        {plan.description}
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label className="input-label">Investment Amount</label>
                            <div style={{ position: 'relative' }}>
                                <span style={{
                                    position: 'absolute',
                                    left: 'var(--space-md)',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: 'var(--text-muted)',
                                    fontSize: 'var(--font-size-xl)'
                                }}>$</span>
                                <input
                                    type="number"
                                    className={`input ${!isValidAmount && amount ? 'input-error' : ''}`}
                                    style={{ paddingLeft: '40px', fontSize: 'var(--font-size-xl)' }}
                                    placeholder="0.00"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    min={plan.minAmount}
                                    max={plan.maxAmount}
                                />
                            </div>
                            <div className="amount-range">
                                <span>Min: {formatCurrency(plan.minAmount)}</span>
                                <span>Max: {formatCurrency(plan.maxAmount)}</span>
                            </div>
                            {amount && !isValidAmount && (
                                <p className="error-text">
                                    <AlertCircle size={14} />
                                    Amount must be between {formatCurrency(plan.minAmount)} and {formatCurrency(plan.maxAmount)}
                                </p>
                            )}
                            {amount && !hasBalance && (
                                <p className="error-text">
                                    <AlertCircle size={14} />
                                    Insufficient wallet balance. Available: {formatCurrency(mockWallet.balance)}
                                </p>
                            )}
                        </div>

                        <div className="quick-amounts">
                            {[plan.minAmount, plan.minAmount * 2, plan.minAmount * 5, plan.maxAmount / 2].map((val, i) => (
                                val <= plan.maxAmount && (
                                    <button
                                        key={i}
                                        type="button"
                                        className="quick-amount-btn"
                                        onClick={() => setAmount(val.toString())}
                                    >
                                        {formatCurrency(val)}
                                    </button>
                                )
                            ))}
                        </div>

                        <div className="summary-box">
                            <div className="summary-row">
                                <span>Investment Amount</span>
                                <span>{formatCurrency(numericAmount)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Expected Return ({plan.returnRate}%)</span>
                                <span className="positive">+{formatCurrency(expectedReturn)}</span>
                            </div>
                            <div className="summary-row total">
                                <span>Final Value</span>
                                <span>{formatCurrency(finalValue)}</span>
                            </div>
                        </div>

                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                            />
                            <span>
                                I understand the risks involved and agree to the{' '}
                                <Link to="/terms">Terms of Service</Link>
                            </span>
                        </label>

                        <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                            style={{ width: '100%' }}
                            disabled={loading || !isValidAmount || !hasBalance || !agreed}
                        >
                            {loading ? (
                                <div className="loader" style={{ width: 20, height: 20, borderWidth: 2 }} />
                            ) : (
                                <>
                                    Confirm Investment
                                    <TrendingUp size={20} />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Plan Summary */}
                <div className="plan-summary-card card">
                    <h3>Plan Details</h3>

                    <div className="plan-info-item">
                        <TrendingUp size={20} style={{ color: 'var(--primary)' }} />
                        <div>
                            <span className="info-label">Return Rate</span>
                            <span className="info-value">{plan.returnRate}%</span>
                        </div>
                    </div>

                    <div className="plan-info-item">
                        <Clock size={20} style={{ color: 'var(--info)' }} />
                        <div>
                            <span className="info-label">Duration</span>
                            <span className="info-value">
                                {plan.duration === 0 ? 'Flexible' : `${plan.duration} days`}
                            </span>
                        </div>
                    </div>

                    <div className="plan-info-item">
                        <Shield size={20} style={{ color: 'var(--warning)' }} />
                        <div>
                            <span className="info-label">Risk Level</span>
                            <span className="info-value">{plan.riskLevel}</span>
                        </div>
                    </div>

                    <div className="plan-info-item">
                        <Wallet size={20} style={{ color: 'var(--success)' }} />
                        <div>
                            <span className="info-label">Your Balance</span>
                            <span className="info-value">{formatCurrency(mockWallet.balance)}</span>
                        </div>
                    </div>

                    <div className="divider" />

                    <h4>Features</h4>
                    <ul className="features-list">
                        {plan.features.map((feature, i) => (
                            <li key={i}>
                                <Check size={16} style={{ color: 'var(--primary)' }} />
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NewInvestment

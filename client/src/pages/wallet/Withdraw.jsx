import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    ArrowLeft,
    Building2,
    Wallet,
    AlertCircle,
    ArrowRight
} from 'lucide-react'
import { mockWallet } from '../../data/mockData'
import { useNotification } from '../../context/NotificationContext'
import '../investments/NewInvestment.css'

function Withdraw() {
    const navigate = useNavigate()
    const { success, error: showError } = useNotification()
    const [method, setMethod] = useState('bank')
    const [amount, setAmount] = useState('')
    const [bankDetails, setBankDetails] = useState({
        accountName: '',
        accountNumber: '',
        bankName: '',
        routingNumber: ''
    })
    const [loading, setLoading] = useState(false)

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(value)
    }

    const numericAmount = parseFloat(amount) || 0
    const isValidAmount = numericAmount >= 50 && numericAmount <= mockWallet.availableBalance

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!isValidAmount) {
            showError('Invalid withdrawal amount')
            return
        }

        setLoading(true)
        await new Promise(resolve => setTimeout(resolve, 2000))
        success('Withdrawal request submitted! It will be processed within 1-3 business days.')
        navigate('/wallet')
    }

    return (
        <div className="new-investment-page fade-in">
            <Link to="/wallet" className="back-link">
                <ArrowLeft size={20} />
                Back to Wallet
            </Link>

            <div className="investment-grid">
                <div className="investment-form-card card">
                    <h2>Withdraw Funds</h2>
                    <p className="text-secondary" style={{ marginBottom: 'var(--space-xl)' }}>
                        Transfer funds from your wallet to your bank account
                    </p>

                    <form onSubmit={handleSubmit}>
                        {/* Available Balance */}
                        <div style={{
                            background: 'var(--bg-secondary)',
                            borderRadius: 'var(--radius-lg)',
                            padding: 'var(--space-lg)',
                            marginBottom: 'var(--space-xl)',
                            textAlign: 'center'
                        }}>
                            <p style={{ color: 'var(--text-muted)', marginBottom: 'var(--space-xs)' }}>Available Balance</p>
                            <h3 style={{ fontSize: 'var(--font-size-3xl)', color: 'var(--primary)' }}>
                                {formatCurrency(mockWallet.availableBalance)}
                            </h3>
                        </div>

                        {/* Amount */}
                        <div className="input-group">
                            <label className="input-label">Withdrawal Amount</label>
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
                                    className={`input ${amount && !isValidAmount ? 'input-error' : ''}`}
                                    style={{ paddingLeft: '40px', fontSize: 'var(--font-size-xl)' }}
                                    placeholder="0.00"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    min="50"
                                    max={mockWallet.availableBalance}
                                />
                            </div>
                            <div className="amount-range">
                                <span>Min: $50</span>
                                <span>Max: {formatCurrency(mockWallet.availableBalance)}</span>
                            </div>
                            {amount && !isValidAmount && (
                                <p className="error-text">
                                    <AlertCircle size={14} />
                                    Amount must be between $50 and {formatCurrency(mockWallet.availableBalance)}
                                </p>
                            )}
                        </div>

                        {/* Quick Amounts */}
                        <div className="quick-amounts">
                            {[100, 500, 1000, mockWallet.availableBalance].map((val, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    className="quick-amount-btn"
                                    onClick={() => setAmount(val.toString())}
                                >
                                    {i === 3 ? 'All' : formatCurrency(val)}
                                </button>
                            ))}
                        </div>

                        {/* Bank Details */}
                        <div style={{ marginTop: 'var(--space-xl)' }}>
                            <h4 style={{ marginBottom: 'var(--space-md)' }}>Bank Details</h4>
                            <div style={{ display: 'grid', gap: 'var(--space-md)' }}>
                                <div className="input-group">
                                    <label className="input-label">Account Holder Name</label>
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="John Doe"
                                        value={bankDetails.accountName}
                                        onChange={(e) => setBankDetails({ ...bankDetails, accountName: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <label className="input-label">Bank Name</label>
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="Chase Bank"
                                        value={bankDetails.bankName}
                                        onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })}
                                        required
                                    />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                                    <div className="input-group">
                                        <label className="input-label">Account Number</label>
                                        <input
                                            type="text"
                                            className="input"
                                            placeholder="****1234"
                                            value={bankDetails.accountNumber}
                                            onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label className="input-label">Routing Number</label>
                                        <input
                                            type="text"
                                            className="input"
                                            placeholder="021000021"
                                            value={bankDetails.routingNumber}
                                            onChange={(e) => setBankDetails({ ...bankDetails, routingNumber: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 'var(--space-sm)',
                            padding: 'var(--space-md)',
                            background: 'var(--warning-bg)',
                            borderRadius: 'var(--radius-md)',
                            marginTop: 'var(--space-xl)'
                        }}>
                            <AlertCircle size={18} style={{ color: 'var(--warning)', flexShrink: 0, marginTop: 2 }} />
                            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--warning)' }}>
                                Withdrawals are processed within 1-3 business days. A $5 processing fee applies to bank transfers.
                            </p>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                            style={{ width: '100%', marginTop: 'var(--space-xl)' }}
                            disabled={loading || !isValidAmount}
                        >
                            {loading ? (
                                <div className="loader" style={{ width: 20, height: 20, borderWidth: 2 }} />
                            ) : (
                                <>
                                    Request Withdrawal
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <div className="plan-summary-card card">
                    <h3>Withdrawal Information</h3>

                    <div className="summary-box" style={{ marginTop: 'var(--space-lg)' }}>
                        <div className="summary-row">
                            <span>Withdrawal Amount</span>
                            <span>{formatCurrency(numericAmount)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Processing Fee</span>
                            <span className="negative">-$5.00</span>
                        </div>
                        <div className="summary-row total">
                            <span>You'll Receive</span>
                            <span>{formatCurrency(Math.max(0, numericAmount - 5))}</span>
                        </div>
                    </div>

                    <div className="divider" />

                    <ul style={{ listStyle: 'none' }}>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-sm)', marginBottom: 'var(--space-md)', color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                            • Processing time: 1-3 business days
                        </li>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-sm)', marginBottom: 'var(--space-md)', color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                            • Minimum withdrawal: $50
                        </li>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-sm)', color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                            • Verification required for KYC
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Withdraw

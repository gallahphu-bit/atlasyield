import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    ArrowLeft,
    CreditCard,
    Building2,
    Wallet,
    Copy,
    Check,
    AlertCircle
} from 'lucide-react'
import { useNotification } from '../../context/NotificationContext'
import '../investments/NewInvestment.css'

function Deposit() {
    const navigate = useNavigate()
    const { success } = useNotification()
    const [method, setMethod] = useState('bank')
    const [amount, setAmount] = useState('')
    const [copied, setCopied] = useState(false)

    const methods = [
        { id: 'bank', name: 'Bank Transfer', icon: Building2, fee: 'Free' },
        { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, fee: '2.5%' },
        { id: 'crypto', name: 'Cryptocurrency', icon: Wallet, fee: 'Network fee' }
    ]

    const bankDetails = {
        bankName: 'Atlas National Bank',
        accountName: 'AtlasYield Ltd',
        accountNumber: '1234567890',
        routingNumber: '021000021',
        reference: 'AY-USR-12345'
    }

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
        success('Copied to clipboard!')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        success('Deposit initiated! Please complete the transfer using the provided details.')
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
                    <h2>Deposit Funds</h2>
                    <p className="text-secondary" style={{ marginBottom: 'var(--space-xl)' }}>
                        Add funds to your wallet to start investing
                    </p>

                    <form onSubmit={handleSubmit}>
                        {/* Payment Method */}
                        <div className="input-group" style={{ marginBottom: 'var(--space-xl)' }}>
                            <label className="input-label">Payment Method</label>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                                {methods.map(m => (
                                    <button
                                        key={m.id}
                                        type="button"
                                        onClick={() => setMethod(m.id)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 'var(--space-md)',
                                            padding: 'var(--space-md)',
                                            background: method === m.id ? 'var(--primary-glow)' : 'var(--bg-secondary)',
                                            border: method === m.id ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                                            borderRadius: 'var(--radius-md)',
                                            cursor: 'pointer',
                                            transition: 'all var(--transition-fast)'
                                        }}
                                    >
                                        <m.icon size={20} style={{ color: method === m.id ? 'var(--primary)' : 'var(--text-muted)' }} />
                                        <span style={{ flex: 1, textAlign: 'left', color: 'var(--text-primary)' }}>{m.name}</span>
                                        <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>{m.fee}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Amount */}
                        <div className="input-group">
                            <label className="input-label">Amount</label>
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
                                    className="input"
                                    style={{ paddingLeft: '40px', fontSize: 'var(--font-size-xl)' }}
                                    placeholder="0.00"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    min="10"
                                />
                            </div>
                            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
                                Minimum deposit: $10
                            </span>
                        </div>

                        {/* Bank Details */}
                        {method === 'bank' && (
                            <div className="summary-box" style={{ marginTop: 'var(--space-xl)' }}>
                                <h4 style={{ marginBottom: 'var(--space-md)' }}>Bank Transfer Details</h4>
                                {Object.entries(bankDetails).map(([key, value]) => (
                                    <div key={key} style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: 'var(--space-sm) 0',
                                        borderBottom: '1px solid var(--border-light)'
                                    }}>
                                        <span style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)' }}>
                                            {key.replace(/([A-Z])/g, ' $1').trim()}
                                        </span>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                                            <span style={{ fontWeight: 500 }}>{value}</span>
                                            <button
                                                type="button"
                                                onClick={() => copyToClipboard(value)}
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    color: 'var(--primary)',
                                                    cursor: 'pointer',
                                                    padding: 4
                                                }}
                                            >
                                                {copied ? <Check size={14} /> : <Copy size={14} />}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Crypto Wallet Details */}
                        {method === 'crypto' && (
                            <div className="summary-box" style={{ marginTop: 'var(--space-xl)' }}>
                                <h4 style={{ marginBottom: 'var(--space-md)' }}>Cryptocurrency Wallets</h4>

                                <div style={{ marginBottom: 'var(--space-lg)' }}>
                                    <span style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)', display: 'block', marginBottom: 'var(--space-xs)' }}>
                                        Bitcoin (BTC)
                                    </span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                                        <span style={{ fontWeight: 500, fontSize: 'var(--font-size-sm)', wordBreak: 'break-all' }}>
                                            bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => copyToClipboard('bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh')}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                color: 'var(--primary)',
                                                cursor: 'pointer',
                                                padding: 4,
                                                flexShrink: 0
                                            }}
                                        >
                                            {copied ? <Check size={14} /> : <Copy size={14} />}
                                        </button>
                                    </div>
                                </div>

                                <div style={{ marginBottom: 'var(--space-lg)' }}>
                                    <span style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)', display: 'block', marginBottom: 'var(--space-xs)' }}>
                                        Ethereum (ETH)
                                    </span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                                        <span style={{ fontWeight: 500, fontSize: 'var(--font-size-sm)', wordBreak: 'break-all' }}>
                                            0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => copyToClipboard('0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb')}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                color: 'var(--primary)',
                                                cursor: 'pointer',
                                                padding: 4,
                                                flexShrink: 0
                                            }}
                                        >
                                            {copied ? <Check size={14} /> : <Copy size={14} />}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <span style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)', display: 'block', marginBottom: 'var(--space-xs)' }}>
                                        USDT (TRC20)
                                    </span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                                        <span style={{ fontWeight: 500, fontSize: 'var(--font-size-sm)', wordBreak: 'break-all' }}>
                                            TYASr5UV6HEcXatwdFQfmLVUqQQQMUxHLS
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => copyToClipboard('TYASr5UV6HEcXatwdFQfmLVUqQQQMUxHLS')}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                color: 'var(--primary)',
                                                cursor: 'pointer',
                                                padding: 4,
                                                flexShrink: 0
                                            }}
                                        >
                                            {copied ? <Check size={14} /> : <Copy size={14} />}
                                        </button>
                                    </div>
                                </div>

                                <div style={{
                                    marginTop: 'var(--space-md)',
                                    padding: 'var(--space-sm)',
                                    background: 'var(--warning-bg)',
                                    borderRadius: 'var(--radius-sm)',
                                    fontSize: 'var(--font-size-xs)',
                                    color: 'var(--warning)'
                                }}>
                                    ⚠️ Send only the selected cryptocurrency to this address. Sending other assets may result in permanent loss.
                                </div>
                            </div>
                        )}

                        <div style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 'var(--space-sm)',
                            padding: 'var(--space-md)',
                            background: 'var(--info-bg)',
                            borderRadius: 'var(--radius-md)',
                            marginTop: 'var(--space-xl)'
                        }}>
                            <AlertCircle size={18} style={{ color: 'var(--info)', flexShrink: 0, marginTop: 2 }} />
                            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--info)' }}>
                                Deposits are typically processed within 1-3 business days. Include your reference number in the transfer.
                            </p>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                            style={{ width: '100%', marginTop: 'var(--space-xl)' }}
                            disabled={!amount || parseFloat(amount) < 10}
                        >
                            Confirm Deposit
                        </button>
                    </form>
                </div>

                <div className="plan-summary-card card">
                    <h3>Deposit Information</h3>
                    <ul style={{ listStyle: 'none', marginTop: 'var(--space-lg)' }}>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-sm)', marginBottom: 'var(--space-md)', color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                            <Check size={16} style={{ color: 'var(--success)', marginTop: 2 }} />
                            No minimum deposit for bank transfers
                        </li>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-sm)', marginBottom: 'var(--space-md)', color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                            <Check size={16} style={{ color: 'var(--success)', marginTop: 2 }} />
                            Card deposits are instant but have a 2.5% fee
                        </li>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-sm)', marginBottom: 'var(--space-md)', color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                            <Check size={16} style={{ color: 'var(--success)', marginTop: 2 }} />
                            Crypto deposits confirmed after network verification
                        </li>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-sm)', color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                            <Check size={16} style={{ color: 'var(--success)', marginTop: 2 }} />
                            24/7 customer support available
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Deposit

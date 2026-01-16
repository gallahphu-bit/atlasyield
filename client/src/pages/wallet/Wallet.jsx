import { Link } from 'react-router-dom'
import {
    Wallet as WalletIcon,
    ArrowDownToLine,
    ArrowUpFromLine,
    TrendingUp,
    Clock,
    History
} from 'lucide-react'
import { mockWallet, mockTransactions } from '../../data/mockData'
import '../dashboard/Dashboard.css'

function Wallet() {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount)
    }

    const recentTransactions = mockTransactions.slice(0, 4)

    return (
        <div className="dashboard-page fade-in">
            <div className="welcome-section">
                <div>
                    <h1>Wallet</h1>
                    <p className="welcome-subtitle">Manage your funds and view transaction history</p>
                </div>
            </div>

            {/* Balance Cards */}
            <div className="stats-grid">
                <div className="stat-card stat-card-primary" style={{ gridColumn: 'span 2' }}>
                    <div className="stat-card-header">
                        <div className="stat-card-icon" style={{ background: 'var(--primary-glow)' }}>
                            <WalletIcon size={24} style={{ color: 'var(--primary)' }} />
                        </div>
                    </div>
                    <span className="stat-card-value">{formatCurrency(mockWallet.balance)}</span>
                    <span className="stat-card-label">Available Balance</span>
                    <div style={{ display: 'flex', gap: 'var(--space-md)', marginTop: 'var(--space-lg)' }}>
                        <Link to="/wallet/deposit" className="btn btn-primary">
                            <ArrowDownToLine size={18} />
                            Deposit
                        </Link>
                        <Link to="/wallet/withdraw" className="btn btn-secondary">
                            <ArrowUpFromLine size={18} />
                            Withdraw
                        </Link>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-card-header">
                        <div className="stat-card-icon" style={{ background: 'var(--success-bg)' }}>
                            <ArrowDownToLine size={24} style={{ color: 'var(--success)' }} />
                        </div>
                    </div>
                    <span className="stat-card-value">{formatCurrency(mockWallet.totalDeposited)}</span>
                    <span className="stat-card-label">Total Deposited</span>
                </div>

                <div className="stat-card">
                    <div className="stat-card-header">
                        <div className="stat-card-icon" style={{ background: 'var(--info-bg)' }}>
                            <ArrowUpFromLine size={24} style={{ color: 'var(--info)' }} />
                        </div>
                    </div>
                    <span className="stat-card-value">{formatCurrency(mockWallet.totalWithdrawn)}</span>
                    <span className="stat-card-label">Total Withdrawn</span>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="card" style={{ padding: 'var(--space-xl)' }}>
                <div className="card-header">
                    <h3>Quick Actions</h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-lg)' }}>
                    <Link to="/wallet/deposit" className="quick-action-card">
                        <div className="quick-action-icon" style={{ background: 'var(--success-bg)' }}>
                            <ArrowDownToLine size={24} style={{ color: 'var(--success)' }} />
                        </div>
                        <div>
                            <h4>Deposit Funds</h4>
                            <p>Add money to your wallet</p>
                        </div>
                    </Link>
                    <Link to="/wallet/withdraw" className="quick-action-card">
                        <div className="quick-action-icon" style={{ background: 'var(--info-bg)' }}>
                            <ArrowUpFromLine size={24} style={{ color: 'var(--info)' }} />
                        </div>
                        <div>
                            <h4>Withdraw Funds</h4>
                            <p>Transfer to your bank</p>
                        </div>
                    </Link>
                    <Link to="/investments/plans" className="quick-action-card">
                        <div className="quick-action-icon" style={{ background: 'var(--primary-glow)' }}>
                            <TrendingUp size={24} style={{ color: 'var(--primary)' }} />
                        </div>
                        <div>
                            <h4>Invest Now</h4>
                            <p>Browse investment plans</p>
                        </div>
                    </Link>
                    <Link to="/wallet/transactions" className="quick-action-card">
                        <div className="quick-action-icon" style={{ background: 'var(--warning-bg)' }}>
                            <History size={24} style={{ color: 'var(--warning)' }} />
                        </div>
                        <div>
                            <h4>Transaction History</h4>
                            <p>View all transactions</p>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Pending */}
            {mockWallet.pendingWithdrawals > 0 && (
                <div className="card" style={{ padding: 'var(--space-lg)', background: 'var(--warning-bg)', border: '1px solid var(--warning)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                        <Clock size={20} style={{ color: 'var(--warning)' }} />
                        <span style={{ color: 'var(--warning)', fontWeight: 500 }}>
                            You have {formatCurrency(mockWallet.pendingWithdrawals)} pending withdrawal(s)
                        </span>
                    </div>
                </div>
            )}

            <style>{`
        .quick-action-card {
          display: flex;
          align-items: center;
          gap: var(--space-lg);
          padding: var(--space-lg);
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          text-decoration: none;
          transition: all var(--transition-base);
        }
        .quick-action-card:hover {
          border-color: var(--primary);
          transform: translateY(-2px);
        }
        .quick-action-icon {
          width: 56px;
          height: 56px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .quick-action-card h4 {
          font-size: var(--font-size-base);
          margin-bottom: var(--space-xs);
        }
        .quick-action-card p {
          font-size: var(--font-size-sm);
          color: var(--text-muted);
        }
      `}</style>
        </div>
    )
}

export default Wallet

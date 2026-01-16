import { useState } from 'react'
import {
    ArrowDownRight,
    ArrowUpRight,
    TrendingUp,
    CheckCircle2,
    Clock,
    XCircle,
    Filter,
    Search,
    Download
} from 'lucide-react'
import { mockTransactions } from '../../data/mockData'
import '../dashboard/Dashboard.css'

function Transactions() {
    const [filter, setFilter] = useState('all')
    const [search, setSearch] = useState('')

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
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const filteredTransactions = mockTransactions.filter(t => {
        if (filter !== 'all' && t.type !== filter) return false
        if (search && !t.reference.toLowerCase().includes(search.toLowerCase())) return false
        return true
    })

    const getIcon = (type) => {
        switch (type) {
            case 'deposit': return <ArrowDownRight size={16} />
            case 'withdrawal': return <ArrowUpRight size={16} />
            case 'investment': return <TrendingUp size={16} />
            case 'profit': return <TrendingUp size={16} />
            default: return null
        }
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed': return <CheckCircle2 size={12} />
            case 'pending': return <Clock size={12} />
            case 'failed': return <XCircle size={12} />
            default: return null
        }
    }

    return (
        <div className="dashboard-page fade-in">
            <div className="welcome-section">
                <div>
                    <h1>Transactions</h1>
                    <p className="welcome-subtitle">View your complete transaction history</p>
                </div>
                <button className="btn btn-secondary">
                    <Download size={18} />
                    Export
                </button>
            </div>

            {/* Filters */}
            <div className="card" style={{ padding: 'var(--space-lg)' }}>
                <div style={{ display: 'flex', gap: 'var(--space-lg)', flexWrap: 'wrap' }}>
                    <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
                        <Search size={18} style={{
                            position: 'absolute',
                            left: 'var(--space-md)',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'var(--text-muted)'
                        }} />
                        <input
                            type="text"
                            className="input"
                            style={{ paddingLeft: 44 }}
                            placeholder="Search by reference..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                        {['all', 'deposit', 'withdrawal', 'investment', 'profit'].map(type => (
                            <button
                                key={type}
                                className={`btn ${filter === type ? 'btn-primary' : 'btn-ghost'}`}
                                onClick={() => setFilter(type)}
                            >
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Transactions Table */}
            <div className="card" style={{ padding: 'var(--space-xl)' }}>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Description</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Reference</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTransactions.map(transaction => (
                                <tr key={transaction.id}>
                                    <td>
                                        <div className="transaction-type">
                                            <span className={`transaction-icon ${transaction.type}`}>
                                                {getIcon(transaction.type)}
                                            </span>
                                            <span className="transaction-label">
                                                {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                                            </span>
                                        </div>
                                    </td>
                                    <td style={{ color: 'var(--text-secondary)' }}>
                                        {transaction.description || transaction.method || '-'}
                                    </td>
                                    <td>
                                        <span className={transaction.type === 'withdrawal' ? 'negative' : 'positive'}>
                                            {transaction.type === 'withdrawal' ? '-' : '+'}
                                            {formatCurrency(transaction.amount)}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`badge badge-${transaction.status === 'completed' ? 'success' :
                                                transaction.status === 'pending' ? 'warning' : 'danger'
                                            }`}>
                                            {getStatusIcon(transaction.status)}
                                            {transaction.status}
                                        </span>
                                    </td>
                                    <td style={{ whiteSpace: 'nowrap' }}>{formatDate(transaction.date)}</td>
                                    <td className="text-muted" style={{ fontFamily: 'monospace', fontSize: 'var(--font-size-sm)' }}>
                                        {transaction.reference}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredTransactions.length === 0 && (
                    <div className="empty-state">
                        <Filter size={48} style={{ color: 'var(--text-muted)' }} />
                        <h3 className="empty-state-title">No transactions found</h3>
                        <p className="empty-state-text">Try adjusting your search or filter</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Transactions

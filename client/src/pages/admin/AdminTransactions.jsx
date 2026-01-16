import { useState } from 'react'
import { CheckCircle, XCircle, Clock, Eye, Search } from 'lucide-react'
import { mockTransactions, mockAdminUsers } from '../../data/mockData'
import { useNotification } from '../../context/NotificationContext'
import '../dashboard/Dashboard.css'

function AdminTransactions() {
    const { success } = useNotification()
    const [filter, setFilter] = useState('pending')

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    }

    const pendingTransactions = mockTransactions.filter(t => t.status === 'pending')
    const allTransactions = filter === 'pending' ? pendingTransactions : mockTransactions

    const handleApprove = (id) => {
        success('Transaction approved successfully')
    }

    const handleReject = (id) => {
        success('Transaction rejected')
    }

    return (
        <div className="dashboard-page fade-in">
            <div className="welcome-section">
                <div>
                    <h1>Transactions</h1>
                    <p className="welcome-subtitle">Review and manage platform transactions</p>
                </div>
            </div>

            {/* Pending Alert */}
            {pendingTransactions.length > 0 && (
                <div style={{ padding: 'var(--space-lg)', background: 'var(--warning-bg)', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-xl)', display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                    <Clock size={20} style={{ color: 'var(--warning)' }} />
                    <span style={{ color: 'var(--warning)', fontWeight: 500 }}>
                        {pendingTransactions.length} transaction(s) pending approval
                    </span>
                </div>
            )}

            <div className="card" style={{ padding: 'var(--space-lg)', marginBottom: 'var(--space-lg)' }}>
                <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                    {['pending', 'all'].map(status => (
                        <button
                            key={status}
                            className={`btn ${filter === status ? 'btn-primary' : 'btn-ghost'}`}
                            onClick={() => setFilter(status)}
                        >
                            {status === 'pending' ? 'Pending Approval' : 'All Transactions'}
                        </button>
                    ))}
                </div>
            </div>

            <div className="card" style={{ padding: 'var(--space-xl)' }}>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Reference</th>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allTransactions.map(tx => (
                                <tr key={tx.id}>
                                    <td style={{ fontFamily: 'monospace', fontSize: 'var(--font-size-sm)' }}>{tx.reference}</td>
                                    <td style={{ textTransform: 'capitalize' }}>{tx.type}</td>
                                    <td style={{ fontWeight: 500 }}>{formatCurrency(tx.amount)}</td>
                                    <td>
                                        <span className={`badge badge-${tx.status === 'completed' ? 'success' : tx.status === 'pending' ? 'warning' : 'danger'}`}>
                                            {tx.status === 'completed' && <CheckCircle size={12} />}
                                            {tx.status === 'pending' && <Clock size={12} />}
                                            {tx.status}
                                        </span>
                                    </td>
                                    <td>{formatDate(tx.date)}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: 'var(--space-xs)' }}>
                                            <button className="btn btn-ghost btn-sm" title="View"><Eye size={16} /></button>
                                            {tx.status === 'pending' && (
                                                <>
                                                    <button className="btn btn-primary btn-sm" onClick={() => handleApprove(tx.id)}>
                                                        <CheckCircle size={14} /> Approve
                                                    </button>
                                                    <button className="btn btn-danger btn-sm" onClick={() => handleReject(tx.id)}>
                                                        <XCircle size={14} /> Reject
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AdminTransactions

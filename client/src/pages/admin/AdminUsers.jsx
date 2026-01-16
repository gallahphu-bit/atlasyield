import { useState } from 'react'
import { Search, MoreVertical, CheckCircle, Clock, XCircle, Eye, Ban, Mail } from 'lucide-react'
import { mockAdminUsers } from '../../data/mockData'
import '../dashboard/Dashboard.css'

function AdminUsers() {
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('all')

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }

    const getStatusBadge = (status) => {
        switch (status) {
            case 'active': return <span className="badge badge-success"><CheckCircle size={12} /> Active</span>
            case 'pending': return <span className="badge badge-warning"><Clock size={12} /> Pending</span>
            case 'suspended': return <span className="badge badge-danger"><XCircle size={12} /> Suspended</span>
            default: return null
        }
    }

    const filteredUsers = mockAdminUsers.filter(user => {
        if (filter !== 'all' && user.status !== filter) return false
        if (search && !user.email.toLowerCase().includes(search.toLowerCase()) &&
            !`${user.firstName} ${user.lastName}`.toLowerCase().includes(search.toLowerCase())) return false
        return true
    })

    return (
        <div className="dashboard-page fade-in">
            <div className="welcome-section">
                <div>
                    <h1>User Management</h1>
                    <p className="welcome-subtitle">Manage platform users and accounts</p>
                </div>
            </div>

            <div className="card" style={{ padding: 'var(--space-lg)', marginBottom: 'var(--space-lg)' }}>
                <div style={{ display: 'flex', gap: 'var(--space-lg)', flexWrap: 'wrap' }}>
                    <div style={{ position: 'relative', flex: 1, minWidth: 250 }}>
                        <Search size={18} style={{ position: 'absolute', left: 'var(--space-md)', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            className="input"
                            style={{ paddingLeft: 44 }}
                            placeholder="Search users..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                        {['all', 'active', 'pending', 'suspended'].map(status => (
                            <button
                                key={status}
                                className={`btn ${filter === status ? 'btn-primary' : 'btn-ghost'}`}
                                onClick={() => setFilter(status)}
                            >
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="card" style={{ padding: 'var(--space-xl)' }}>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Status</th>
                                <th>KYC</th>
                                <th>Balance</th>
                                <th>Invested</th>
                                <th>Joined</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map(user => (
                                <tr key={user.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                                            <div className="avatar avatar-sm">{user.firstName[0]}{user.lastName[0]}</div>
                                            <div>
                                                <p style={{ fontWeight: 500 }}>{user.firstName} {user.lastName}</p>
                                                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{getStatusBadge(user.status)}</td>
                                    <td>
                                        <span className={`badge badge-${user.kycStatus === 'verified' ? 'success' : user.kycStatus === 'pending' ? 'warning' : 'danger'}`}>
                                            {user.kycStatus}
                                        </span>
                                    </td>
                                    <td>{formatCurrency(user.balance)}</td>
                                    <td>{formatCurrency(user.totalInvested)}</td>
                                    <td>{formatDate(user.joinedAt)}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: 'var(--space-xs)' }}>
                                            <button className="btn btn-ghost btn-sm" title="View"><Eye size={16} /></button>
                                            <button className="btn btn-ghost btn-sm" title="Email"><Mail size={16} /></button>
                                            <button className="btn btn-ghost btn-sm" title="Suspend"><Ban size={16} /></button>
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

export default AdminUsers

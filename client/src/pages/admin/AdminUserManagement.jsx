import { useState, useEffect } from 'react'
import { Search, User, Wallet, TrendingUp, History, Settings, Save, X, Plus, Edit2, Trash2 } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import './AdminUserManagement.css'

const API_URL = import.meta.env.VITE_API_URL || '/api'

function AdminUserManagement() {
    const { token } = useAuth()
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const [userData, setUserData] = useState(null)
    const [activeTab, setActiveTab] = useState('profile')
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [message, setMessage] = useState({ type: '', text: '' })

    // Form states
    const [profileForm, setProfileForm] = useState({})
    const [accountForm, setAccountForm] = useState({})
    const [walletForm, setWalletForm] = useState({ action: 'add', amount: 0, description: '' })
    const [investmentForm, setInvestmentForm] = useState({})
    const [transactionForm, setTransactionForm] = useState({ type: 'bonus', amount: 0, description: '' })
    const [plans, setPlans] = useState([])

    useEffect(() => {
        fetchUsers()
        fetchPlans()
    }, [])

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${API_URL}/admin/users`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            const data = await response.json()
            if (data.success) {
                setUsers(data.users)
            }
        } catch (error) {
            console.error('Fetch users error:', error)
        }
    }

    const fetchPlans = async () => {
        try {
            const response = await fetch(`${API_URL}/admin/plans`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            const data = await response.json()
            if (data.success) {
                setPlans(data.plans)
            }
        } catch (error) {
            console.error('Fetch plans error:', error)
        }
    }

    const fetchUserData = async (userId) => {
        setLoading(true)
        try {
            const response = await fetch(`${API_URL}/admin/users/${userId}/full`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            const data = await response.json()
            if (data.success) {
                setUserData(data.data)
                setProfileForm({
                    firstName: data.data.user.firstName,
                    lastName: data.data.user.lastName,
                    email: data.data.user.email,
                    phone: data.data.user.phone || '',
                    country: data.data.user.country || ''
                })
                setAccountForm({
                    role: data.data.user.role,
                    status: data.data.user.status,
                    isVerified: data.data.user.isVerified,
                    kycStatus: data.data.user.kycStatus,
                    twoFactorEnabled: data.data.user.twoFactorEnabled
                })
            }
        } catch (error) {
            console.error('Fetch user data error:', error)
        }
        setLoading(false)
    }

    const handleSelectUser = (user) => {
        setSelectedUser(user)
        fetchUserData(user._id)
        setActiveTab('profile')
    }

    const showMessage = (type, text) => {
        setMessage({ type, text })
        setTimeout(() => setMessage({ type: '', text: '' }), 5000)
    }

    const updateProfile = async () => {
        setLoading(true)
        try {
            const response = await fetch(`${API_URL}/admin/users/${selectedUser._id}/profile`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(profileForm)
            })
            const data = await response.json()
            if (data.success) {
                showMessage('success', 'Profile updated successfully')
                fetchUserData(selectedUser._id)
                fetchUsers()
            } else {
                showMessage('error', data.message)
            }
        } catch (error) {
            showMessage('error', 'Failed to update profile')
        }
        setLoading(false)
    }

    const updateAccount = async () => {
        setLoading(true)
        try {
            const response = await fetch(`${API_URL}/admin/users/${selectedUser._id}/account`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(accountForm)
            })
            const data = await response.json()
            if (data.success) {
                showMessage('success', 'Account settings updated successfully')
                fetchUserData(selectedUser._id)
            } else {
                showMessage('error', data.message)
            }
        } catch (error) {
            showMessage('error', 'Failed to update account')
        }
        setLoading(false)
    }

    const updateWallet = async () => {
        setLoading(true)
        try {
            const response = await fetch(`${API_URL}/admin/users/${selectedUser._id}/wallet`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(walletForm)
            })
            const data = await response.json()
            if (data.success) {
                showMessage('success', 'Wallet updated successfully')
                fetchUserData(selectedUser._id)
                setWalletForm({ action: 'add', amount: 0, description: '' })
            } else {
                showMessage('error', data.message)
            }
        } catch (error) {
            showMessage('error', 'Failed to update wallet')
        }
        setLoading(false)
    }

    const createInvestment = async () => {
        setLoading(true)
        try {
            const response = await fetch(`${API_URL}/admin/investments/create`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: selectedUser._id,
                    ...investmentForm
                })
            })
            const data = await response.json()
            if (data.success) {
                showMessage('success', 'Investment created successfully')
                fetchUserData(selectedUser._id)
                setInvestmentForm({})
            } else {
                showMessage('error', data.message)
            }
        } catch (error) {
            showMessage('error', 'Failed to create investment')
        }
        setLoading(false)
    }

    const createTransaction = async () => {
        setLoading(true)
        try {
            const response = await fetch(`${API_URL}/admin/transactions/create`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: selectedUser._id,
                    ...transactionForm
                })
            })
            const data = await response.json()
            if (data.success) {
                showMessage('success', 'Transaction created successfully')
                fetchUserData(selectedUser._id)
                setTransactionForm({ type: 'bonus', amount: 0, description: '' })
            } else {
                showMessage('error', data.message)
            }
        } catch (error) {
            showMessage('error', 'Failed to create transaction')
        }
        setLoading(false)
    }

    const filteredUsers = users.filter(user =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="admin-user-management">
            <div className="page-header">
                <h1>User Management</h1>
                <p>Manage user accounts, wallets, and investments</p>
            </div>

            {message.text && (
                <div className={`alert alert-${message.type}`}>
                    {message.text}
                </div>
            )}

            <div className="management-container">
                {/* User List Sidebar */}
                <div className="user-list-sidebar">
                    <div className="search-box">
                        <Search size={20} />
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="user-list">
                        {filteredUsers.map(user => (
                            <div
                                key={user._id}
                                className={`user-item ${selectedUser?._id === user._id ? 'active' : ''}`}
                                onClick={() => handleSelectUser(user)}
                            >
                                <div className="user-avatar">
                                    {user.firstName[0]}{user.lastName[0]}
                                </div>
                                <div className="user-info">
                                    <div className="user-name">{user.firstName} {user.lastName}</div>
                                    <div className="user-email">{user.email}</div>
                                </div>
                                <span className={`status-badge status-${user.status}`}>
                                    {user.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* User Details Panel */}
                <div className="user-details-panel">
                    {!selectedUser ? (
                        <div className="empty-state">
                            <User size={48} />
                            <p>Select a user to manage their account</p>
                        </div>
                    ) : loading ? (
                        <div className="loading-state">Loading...</div>
                    ) : (
                        <>
                            <div className="user-header">
                                <div className="user-avatar-large">
                                    {selectedUser.firstName[0]}{selectedUser.lastName[0]}
                                </div>
                                <div>
                                    <h2>{selectedUser.firstName} {selectedUser.lastName}</h2>
                                    <p>{selectedUser.email}</p>
                                </div>
                            </div>

                            {userData && (
                                <div className="stats-grid">
                                    <div className="stat-card">
                                        <Wallet size={20} />
                                        <div>
                                            <div className="stat-label">Wallet Balance</div>
                                            <div className="stat-value">${userData.wallet?.balance?.toFixed(2) || '0.00'}</div>
                                        </div>
                                    </div>
                                    <div className="stat-card">
                                        <TrendingUp size={20} />
                                        <div>
                                            <div className="stat-label">Portfolio Value</div>
                                            <div className="stat-value">${userData.stats?.portfolioValue?.toFixed(2) || '0.00'}</div>
                                        </div>
                                    </div>
                                    <div className="stat-card">
                                        <TrendingUp size={20} />
                                        <div>
                                            <div className="stat-label">Total Profit</div>
                                            <div className="stat-value profit">${userData.stats?.totalProfit?.toFixed(2) || '0.00'}</div>
                                        </div>
                                    </div>
                                    <div className="stat-card">
                                        <History size={20} />
                                        <div>
                                            <div className="stat-label">Active Investments</div>
                                            <div className="stat-value">{userData.stats?.activeInvestmentsCount || 0}</div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="tabs">
                                <button
                                    className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('profile')}
                                >
                                    <User size={18} /> Profile
                                </button>
                                <button
                                    className={`tab ${activeTab === 'account' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('account')}
                                >
                                    <Settings size={18} /> Account
                                </button>
                                <button
                                    className={`tab ${activeTab === 'wallet' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('wallet')}
                                >
                                    <Wallet size={18} /> Wallet
                                </button>
                                <button
                                    className={`tab ${activeTab === 'investments' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('investments')}
                                >
                                    <TrendingUp size={18} /> Investments
                                </button>
                                <button
                                    className={`tab ${activeTab === 'transactions' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('transactions')}
                                >
                                    <History size={18} /> Transactions
                                </button>
                            </div>

                            <div className="tab-content">
                                {/* Profile Tab */}
                                {activeTab === 'profile' && (
                                    <div className="form-section">
                                        <h3>Profile Information</h3>
                                        <div className="form-grid">
                                            <div className="form-group">
                                                <label>First Name</label>
                                                <input
                                                    type="text"
                                                    value={profileForm.firstName || ''}
                                                    onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Last Name</label>
                                                <input
                                                    type="text"
                                                    value={profileForm.lastName || ''}
                                                    onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Email</label>
                                                <input
                                                    type="email"
                                                    value={profileForm.email || ''}
                                                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Phone</label>
                                                <input
                                                    type="tel"
                                                    value={profileForm.phone || ''}
                                                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                                                />
                                            </div>
                                            <div className="form-group full-width">
                                                <label>Country</label>
                                                <input
                                                    type="text"
                                                    value={profileForm.country || ''}
                                                    onChange={(e) => setProfileForm({ ...profileForm, country: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <button className="btn btn-primary" onClick={updateProfile} disabled={loading}>
                                            <Save size={18} /> Save Profile
                                        </button>
                                    </div>
                                )}

                                {/* Account Tab */}
                                {activeTab === 'account' && (
                                    <div className="form-section">
                                        <h3>Account Settings</h3>
                                        <div className="form-grid">
                                            <div className="form-group">
                                                <label>Role</label>
                                                <select
                                                    value={accountForm.role || 'user'}
                                                    onChange={(e) => setAccountForm({ ...accountForm, role: e.target.value })}
                                                >
                                                    <option value="user">User</option>
                                                    <option value="admin">Admin</option>
                                                    <option value="support">Support</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Status</label>
                                                <select
                                                    value={accountForm.status || 'pending'}
                                                    onChange={(e) => setAccountForm({ ...accountForm, status: e.target.value })}
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="active">Active</option>
                                                    <option value="suspended">Suspended</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>KYC Status</label>
                                                <select
                                                    value={accountForm.kycStatus || 'pending'}
                                                    onChange={(e) => setAccountForm({ ...accountForm, kycStatus: e.target.value })}
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="submitted">Submitted</option>
                                                    <option value="verified">Verified</option>
                                                    <option value="rejected">Rejected</option>
                                                </select>
                                            </div>
                                            <div className="form-group checkbox-group">
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        checked={accountForm.isVerified || false}
                                                        onChange={(e) => setAccountForm({ ...accountForm, isVerified: e.target.checked })}
                                                    />
                                                    Email Verified
                                                </label>
                                            </div>
                                            <div className="form-group checkbox-group">
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        checked={accountForm.twoFactorEnabled || false}
                                                        onChange={(e) => setAccountForm({ ...accountForm, twoFactorEnabled: e.target.checked })}
                                                    />
                                                    Two-Factor Enabled
                                                </label>
                                            </div>
                                        </div>
                                        <button className="btn btn-primary" onClick={updateAccount} disabled={loading}>
                                            <Save size={18} /> Save Account Settings
                                        </button>
                                    </div>
                                )}

                                {/* Wallet Tab */}
                                {activeTab === 'wallet' && userData && (
                                    <div className="form-section">
                                        <h3>Wallet Management</h3>
                                        <div className="wallet-info">
                                            <div className="info-row">
                                                <span>Current Balance:</span>
                                                <strong>${userData.wallet?.balance?.toFixed(2) || '0.00'}</strong>
                                            </div>
                                            <div className="info-row">
                                                <span>Total Deposited:</span>
                                                <strong>${userData.wallet?.totalDeposited?.toFixed(2) || '0.00'}</strong>
                                            </div>
                                            <div className="info-row">
                                                <span>Total Withdrawn:</span>
                                                <strong>${userData.wallet?.totalWithdrawn?.toFixed(2) || '0.00'}</strong>
                                            </div>
                                        </div>

                                        <div className="form-grid">
                                            <div className="form-group">
                                                <label>Action</label>
                                                <select
                                                    value={walletForm.action}
                                                    onChange={(e) => setWalletForm({ ...walletForm, action: e.target.value })}
                                                >
                                                    <option value="add">Add Funds</option>
                                                    <option value="subtract">Subtract Funds</option>
                                                    <option value="set">Set Balance</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>{walletForm.action === 'set' ? 'New Balance' : 'Amount'}</label>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    value={walletForm.amount}
                                                    onChange={(e) => setWalletForm({ ...walletForm, amount: parseFloat(e.target.value) })}
                                                />
                                            </div>
                                            <div className="form-group full-width">
                                                <label>Description</label>
                                                <input
                                                    type="text"
                                                    placeholder="Reason for adjustment..."
                                                    value={walletForm.description}
                                                    onChange={(e) => setWalletForm({ ...walletForm, description: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <button className="btn btn-primary" onClick={updateWallet} disabled={loading}>
                                            <Save size={18} /> Update Wallet
                                        </button>
                                    </div>
                                )}

                                {/* Investments Tab */}
                                {activeTab === 'investments' && userData && (
                                    <div className="form-section">
                                        <h3>Create New Investment</h3>
                                        <div className="form-grid">
                                            <div className="form-group">
                                                <label>Investment Plan</label>
                                                <select
                                                    value={investmentForm.planId || ''}
                                                    onChange={(e) => setInvestmentForm({ ...investmentForm, planId: e.target.value })}
                                                >
                                                    <option value="">Select a plan...</option>
                                                    {plans.map(plan => (
                                                        <option key={plan._id} value={plan._id}>
                                                            {plan.name} ({plan.returnRate}% - {plan.duration} days)
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Amount</label>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    value={investmentForm.amount || ''}
                                                    onChange={(e) => setInvestmentForm({ ...investmentForm, amount: parseFloat(e.target.value) })}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Custom Profit (optional)</label>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    value={investmentForm.customProfit || ''}
                                                    onChange={(e) => setInvestmentForm({ ...investmentForm, customProfit: parseFloat(e.target.value) })}
                                                />
                                            </div>
                                            <div className="form-group checkbox-group">
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        checked={investmentForm.deductFromWallet !== false}
                                                        onChange={(e) => setInvestmentForm({ ...investmentForm, deductFromWallet: e.target.checked })}
                                                    />
                                                    Deduct from wallet
                                                </label>
                                            </div>
                                        </div>
                                        <button className="btn btn-primary" onClick={createInvestment} disabled={loading}>
                                            <Plus size={18} /> Create Investment
                                        </button>

                                        <h3 style={{ marginTop: '2rem' }}>Active Investments</h3>
                                        <div className="investments-list">
                                            {userData.investments?.filter(inv => inv.status === 'active').map(investment => (
                                                <div key={investment._id} className="investment-card">
                                                    <div className="investment-header">
                                                        <strong>{investment.planName}</strong>
                                                        <span className="status-badge status-active">{investment.status}</span>
                                                    </div>
                                                    <div className="investment-details">
                                                        <div>Amount: ${investment.amount?.toFixed(2)}</div>
                                                        <div>Profit: ${investment.profit?.toFixed(2) || '0.00'}</div>
                                                        <div>Progress: {investment.progress || 0}%</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Transactions Tab */}
                                {activeTab === 'transactions' && userData && (
                                    <div className="form-section">
                                        <h3>Create Manual Transaction</h3>
                                        <div className="form-grid">
                                            <div className="form-group">
                                                <label>Transaction Type</label>
                                                <select
                                                    value={transactionForm.type}
                                                    onChange={(e) => setTransactionForm({ ...transactionForm, type: e.target.value })}
                                                >
                                                    <option value="bonus">Bonus</option>
                                                    <option value="deposit">Deposit</option>
                                                    <option value="profit">Profit</option>
                                                    <option value="refund">Refund</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Amount</label>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    value={transactionForm.amount}
                                                    onChange={(e) => setTransactionForm({ ...transactionForm, amount: parseFloat(e.target.value) })}
                                                />
                                            </div>
                                            <div className="form-group full-width">
                                                <label>Description</label>
                                                <input
                                                    type="text"
                                                    placeholder="Transaction description..."
                                                    value={transactionForm.description}
                                                    onChange={(e) => setTransactionForm({ ...transactionForm, description: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <button className="btn btn-primary" onClick={createTransaction} disabled={loading}>
                                            <Plus size={18} /> Create Transaction
                                        </button>

                                        <h3 style={{ marginTop: '2rem' }}>Recent Transactions</h3>
                                        <div className="transactions-list">
                                            {userData.transactions?.slice(0, 10).map(transaction => (
                                                <div key={transaction._id} className="transaction-row">
                                                    <div className="transaction-info">
                                                        <strong>{transaction.type}</strong>
                                                        <span>{transaction.description}</span>
                                                    </div>
                                                    <div className="transaction-amount">
                                                        <span className={`amount ${transaction.type === 'withdrawal' ? 'negative' : 'positive'}`}>
                                                            {transaction.type === 'withdrawal' ? '-' : '+'}${transaction.amount?.toFixed(2)}
                                                        </span>
                                                        <span className={`status-badge status-${transaction.status}`}>
                                                            {transaction.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AdminUserManagement

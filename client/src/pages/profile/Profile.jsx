import { useState } from 'react'
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save, X } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useNotification } from '../../context/NotificationContext'
import '../dashboard/Dashboard.css'

function Profile() {
    const { user, updateUser } = useAuth()
    const { success } = useNotification()
    const [editing, setEditing] = useState(false)
    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        phone: '+1 (555) 123-4567',
        country: 'United States'
    })

    const handleSave = () => {
        updateUser(formData)
        setEditing(false)
        success('Profile updated successfully!')
    }

    return (
        <div className="dashboard-page fade-in">
            <div className="welcome-section">
                <div>
                    <h1>Profile</h1>
                    <p className="welcome-subtitle">Manage your personal information</p>
                </div>
                {editing ? (
                    <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
                        <button className="btn btn-secondary" onClick={() => setEditing(false)}>
                            <X size={18} />
                            Cancel
                        </button>
                        <button className="btn btn-primary" onClick={handleSave}>
                            <Save size={18} />
                            Save Changes
                        </button>
                    </div>
                ) : (
                    <button className="btn btn-secondary" onClick={() => setEditing(true)}>
                        <Edit2 size={18} />
                        Edit Profile
                    </button>
                )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-xl)' }}>
                {/* Profile Card */}
                <div className="card" style={{ padding: 'var(--space-xl)', textAlign: 'center' }}>
                    <div className="avatar avatar-lg" style={{ margin: '0 auto var(--space-lg)', width: 100, height: 100, fontSize: 'var(--font-size-3xl)' }}>
                        {user?.firstName?.[0]}{user?.lastName?.[0]}
                    </div>
                    <h3>{user?.firstName} {user?.lastName}</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: 'var(--space-lg)' }}>{user?.email}</p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-sm)' }}>
                        <span className="badge badge-success">Verified</span>
                        <span className="badge badge-info">KYC Approved</span>
                    </div>
                    <div className="divider" />
                    <div style={{ textAlign: 'left' }}>
                        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)', marginBottom: 'var(--space-sm)' }}>
                            Member since
                        </p>
                        <p style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                            <Calendar size={16} style={{ color: 'var(--text-muted)' }} />
                            January 15, 2024
                        </p>
                    </div>
                </div>

                {/* Details Form */}
                <div className="card" style={{ padding: 'var(--space-xl)' }}>
                    <h3 style={{ marginBottom: 'var(--space-xl)' }}>Personal Information</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-lg)' }}>
                        <div className="input-group">
                            <label className="input-label">
                                <User size={14} style={{ marginRight: 'var(--space-xs)' }} />
                                First Name
                            </label>
                            <input
                                type="text"
                                className="input"
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                disabled={!editing}
                            />
                        </div>
                        <div className="input-group">
                            <label className="input-label">
                                <User size={14} style={{ marginRight: 'var(--space-xs)' }} />
                                Last Name
                            </label>
                            <input
                                type="text"
                                className="input"
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                disabled={!editing}
                            />
                        </div>
                        <div className="input-group" style={{ gridColumn: 'span 2' }}>
                            <label className="input-label">
                                <Mail size={14} style={{ marginRight: 'var(--space-xs)' }} />
                                Email Address
                            </label>
                            <input
                                type="email"
                                className="input"
                                value={formData.email}
                                disabled
                                style={{ opacity: 0.6 }}
                            />
                            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
                                Email cannot be changed
                            </span>
                        </div>
                        <div className="input-group">
                            <label className="input-label">
                                <Phone size={14} style={{ marginRight: 'var(--space-xs)' }} />
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                className="input"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                disabled={!editing}
                            />
                        </div>
                        <div className="input-group">
                            <label className="input-label">
                                <MapPin size={14} style={{ marginRight: 'var(--space-xs)' }} />
                                Country
                            </label>
                            <input
                                type="text"
                                className="input"
                                value={formData.country}
                                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                disabled={!editing}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile

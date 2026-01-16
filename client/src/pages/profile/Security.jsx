import { useState } from 'react'
import { Shield, Lock, Smartphone, Eye, EyeOff, Check, AlertTriangle } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useNotification } from '../../context/NotificationContext'
import '../dashboard/Dashboard.css'

function Security() {
    const { user } = useAuth()
    const { success } = useNotification()
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: ''
    })

    const handlePasswordChange = (e) => {
        e.preventDefault()
        if (passwords.new !== passwords.confirm) {
            return
        }
        success('Password changed successfully!')
        setPasswords({ current: '', new: '', confirm: '' })
    }

    const toggle2FA = () => {
        setTwoFactorEnabled(!twoFactorEnabled)
        success(twoFactorEnabled ? '2FA disabled' : '2FA enabled successfully!')
    }

    return (
        <div className="dashboard-page fade-in">
            <div className="welcome-section">
                <div>
                    <h1>Security Settings</h1>
                    <p className="welcome-subtitle">Manage your account security</p>
                </div>
            </div>

            <div style={{ display: 'grid', gap: 'var(--space-xl)', maxWidth: 700 }}>
                {/* Change Password */}
                <div className="card" style={{ padding: 'var(--space-xl)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
                        <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-md)', background: 'var(--primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Lock size={24} style={{ color: 'var(--primary)' }} />
                        </div>
                        <div>
                            <h3>Change Password</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)' }}>
                                Update your password regularly for security
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handlePasswordChange}>
                        <div style={{ display: 'grid', gap: 'var(--space-lg)' }}>
                            <div className="input-group">
                                <label className="input-label">Current Password</label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type={showCurrentPassword ? 'text' : 'password'}
                                        className="input"
                                        placeholder="Enter current password"
                                        value={passwords.current}
                                        onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                        style={{ position: 'absolute', right: 'var(--space-md)', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                                    >
                                        {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                            <div className="input-group">
                                <label className="input-label">New Password</label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type={showNewPassword ? 'text' : 'password'}
                                        className="input"
                                        placeholder="Enter new password"
                                        value={passwords.new}
                                        onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                                        required
                                        minLength={8}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        style={{ position: 'absolute', right: 'var(--space-md)', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                                    >
                                        {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                            <div className="input-group">
                                <label className="input-label">Confirm New Password</label>
                                <input
                                    type="password"
                                    className="input"
                                    placeholder="Confirm new password"
                                    value={passwords.confirm}
                                    onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ marginTop: 'var(--space-xl)' }}>
                            Update Password
                        </button>
                    </form>
                </div>

                {/* Two-Factor Authentication */}
                <div className="card" style={{ padding: 'var(--space-xl)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                            <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-md)', background: 'var(--info-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Smartphone size={24} style={{ color: 'var(--info)' }} />
                            </div>
                            <div>
                                <h3>Two-Factor Authentication</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)' }}>
                                    Add an extra layer of security to your account
                                </p>
                            </div>
                        </div>
                        <button
                            className={`btn ${twoFactorEnabled ? 'btn-danger' : 'btn-primary'}`}
                            onClick={toggle2FA}
                        >
                            {twoFactorEnabled ? 'Disable' : 'Enable'} 2FA
                        </button>
                    </div>
                    {twoFactorEnabled && (
                        <div style={{ marginTop: 'var(--space-lg)', padding: 'var(--space-md)', background: 'var(--success-bg)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                            <Check size={18} style={{ color: 'var(--success)' }} />
                            <span style={{ color: 'var(--success)', fontSize: 'var(--font-size-sm)' }}>
                                Two-factor authentication is currently enabled
                            </span>
                        </div>
                    )}
                </div>

                {/* Login Activity */}
                <div className="card" style={{ padding: 'var(--space-xl)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
                        <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-md)', background: 'var(--warning-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Shield size={24} style={{ color: 'var(--warning)' }} />
                        </div>
                        <div>
                            <h3>Recent Login Activity</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)' }}>
                                Review recent logins to your account
                            </p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                        {[
                            { device: 'Chrome on Windows', ip: '192.168.1.1', time: 'Just now', current: true },
                            { device: 'Safari on iPhone', ip: '192.168.1.2', time: '2 hours ago' },
                            { device: 'Firefox on Mac', ip: '192.168.1.3', time: 'Yesterday' }
                        ].map((login, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-md)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                                <div>
                                    <p style={{ fontWeight: 500, marginBottom: 'var(--space-xs)' }}>
                                        {login.device}
                                        {login.current && <span className="badge badge-success" style={{ marginLeft: 'var(--space-sm)' }}>Current</span>}
                                    </p>
                                    <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)' }}>
                                        IP: {login.ip}
                                    </p>
                                </div>
                                <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)' }}>{login.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Security

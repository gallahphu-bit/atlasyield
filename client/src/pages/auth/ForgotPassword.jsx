import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react'
import { useNotification } from '../../context/NotificationContext'

function ForgotPassword() {
    const { success } = useNotification()
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))

        setSent(true)
        success('Password reset link sent to your email')
        setLoading(false)
    }

    if (sent) {
        return (
            <div style={{ textAlign: 'center' }}>
                <div style={{
                    width: 80,
                    height: 80,
                    margin: '0 auto var(--space-xl)',
                    background: 'var(--success-bg)',
                    borderRadius: 'var(--radius-full)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <CheckCircle size={40} style={{ color: 'var(--success)' }} />
                </div>
                <h1 className="auth-title">Check Your Email</h1>
                <p className="auth-subtitle">
                    We've sent a password reset link to <strong style={{ color: 'var(--text-primary)' }}>{email}</strong>
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)', marginTop: 'var(--space-lg)' }}>
                    Didn't receive the email? Check your spam folder or{' '}
                    <button
                        onClick={() => setSent(false)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--primary)',
                            cursor: 'pointer',
                            textDecoration: 'underline'
                        }}
                    >
                        try again
                    </button>
                </p>
                <Link
                    to="/login"
                    className="btn btn-secondary"
                    style={{ marginTop: 'var(--space-xl)', display: 'inline-flex' }}
                >
                    <ArrowLeft size={18} />
                    Back to Sign In
                </Link>
            </div>
        )
    }

    return (
        <>
            <h1 className="auth-title">Reset Password</h1>
            <p className="auth-subtitle">
                Enter your email address and we'll send you a link to reset your password
            </p>

            <form className="auth-form" onSubmit={handleSubmit}>
                <div className="auth-input-group">
                    <label className="auth-input-label">Email Address</label>
                    <div className="auth-input-wrapper">
                        <Mail size={18} className="auth-input-icon" />
                        <input
                            type="email"
                            className="auth-input"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <button type="submit" className="auth-submit" disabled={loading}>
                    {loading ? (
                        <div className="loader" style={{ width: 20, height: 20, borderWidth: 2 }} />
                    ) : (
                        <>
                            Send Reset Link
                            <ArrowRight size={18} />
                        </>
                    )}
                </button>
            </form>

            <div className="auth-switch">
                Remember your password? <Link to="/login">Sign in</Link>
            </div>
        </>
    )
}

export default ForgotPassword

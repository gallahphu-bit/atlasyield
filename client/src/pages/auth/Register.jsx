import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, Check, AlertCircle } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useNotification } from '../../context/NotificationContext'

function Register() {
    const navigate = useNavigate()
    const { register } = useAuth()
    const { success } = useNotification()

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [agreeTerms, setAgreeTerms] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setError('')
    }

    const passwordStrength = (password) => {
        let strength = 0
        if (password.length >= 8) strength++
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
        if (/\d/.test(password)) strength++
        if (/[^a-zA-Z0-9]/.test(password)) strength++
        return strength
    }

    const getStrengthColor = (strength) => {
        if (strength <= 1) return 'var(--danger)'
        if (strength === 2) return 'var(--warning)'
        if (strength === 3) return 'var(--info)'
        return 'var(--success)'
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match')
            return
        }

        if (!agreeTerms) {
            setError('Please agree to the terms and conditions')
            return
        }

        setLoading(true)
        setError('')

        try {
            const result = await register(formData)

            if (result.success) {
                success('Account created! You can now log in.')
                navigate('/login')
            } else {
                setError(result.error || 'Registration failed')
            }
        } catch (err) {
            setError('An error occurred. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const strength = passwordStrength(formData.password)

    return (
        <>
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">Start your investment journey with AtlasYield</p>

            {error && (
                <div className="auth-error" style={{ marginBottom: 'var(--space-lg)' }}>
                    <AlertCircle size={18} />
                    {error}
                </div>
            )}

            <form className="auth-form" onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                    <div className="auth-input-group">
                        <label className="auth-input-label">First Name</label>
                        <div className="auth-input-wrapper">
                            <User size={18} className="auth-input-icon" />
                            <input
                                type="text"
                                name="firstName"
                                className="auth-input"
                                placeholder="John"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="auth-input-group">
                        <label className="auth-input-label">Last Name</label>
                        <div className="auth-input-wrapper">
                            <User size={18} className="auth-input-icon" />
                            <input
                                type="text"
                                name="lastName"
                                className="auth-input"
                                placeholder="Doe"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="auth-input-group">
                    <label className="auth-input-label">Email Address</label>
                    <div className="auth-input-wrapper">
                        <Mail size={18} className="auth-input-icon" />
                        <input
                            type="email"
                            name="email"
                            className="auth-input"
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="auth-input-group">
                    <label className="auth-input-label">Password</label>
                    <div className="auth-input-wrapper">
                        <Lock size={18} className="auth-input-icon" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            className="auth-input"
                            placeholder="Create a strong password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength={8}
                        />
                        <button
                            type="button"
                            className="auth-input-action"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    {formData.password && (
                        <div style={{ marginTop: 'var(--space-sm)' }}>
                            <div style={{
                                height: 4,
                                background: 'var(--bg-elevated)',
                                borderRadius: 'var(--radius-full)',
                                overflow: 'hidden'
                            }}>
                                <div style={{
                                    width: `${strength * 25}%`,
                                    height: '100%',
                                    background: getStrengthColor(strength),
                                    transition: 'all 0.3s ease'
                                }} />
                            </div>
                            <p style={{
                                fontSize: 'var(--font-size-xs)',
                                color: getStrengthColor(strength),
                                marginTop: 'var(--space-xs)'
                            }}>
                                {strength <= 1 && 'Weak password'}
                                {strength === 2 && 'Fair password'}
                                {strength === 3 && 'Good password'}
                                {strength === 4 && 'Strong password'}
                            </p>
                        </div>
                    )}
                </div>

                <div className="auth-input-group">
                    <label className="auth-input-label">Confirm Password</label>
                    <div className="auth-input-wrapper">
                        <Lock size={18} className="auth-input-icon" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            className="auth-input"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        {formData.confirmPassword && formData.password === formData.confirmPassword && (
                            <Check size={18} style={{
                                position: 'absolute',
                                right: 'var(--space-md)',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: 'var(--success)'
                            }} />
                        )}
                    </div>
                </div>

                <label className="auth-remember" style={{ alignItems: 'flex-start' }}>
                    <input
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        style={{ marginTop: 3 }}
                    />
                    <span>
                        I agree to the <Link to="/terms" style={{ color: 'var(--primary)' }}>Terms of Service</Link> and <Link to="/privacy" style={{ color: 'var(--primary)' }}>Privacy Policy</Link>
                    </span>
                </label>

                <button type="submit" className="auth-submit" disabled={loading}>
                    {loading ? (
                        <div className="loader" style={{ width: 20, height: 20, borderWidth: 2 }} />
                    ) : (
                        <>
                            Create Account
                            <ArrowRight size={18} />
                        </>
                    )}
                </button>
            </form>

            <div className="auth-switch">
                Already have an account? <Link to="/login">Sign in</Link>
            </div>
        </>
    )
}

export default Register

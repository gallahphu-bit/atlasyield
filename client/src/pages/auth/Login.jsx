import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useNotification } from '../../context/NotificationContext'

function Login() {
    const navigate = useNavigate()
    const { login } = useAuth()
    const { success, error: showError } = useNotification()

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const result = await login(formData.email, formData.password)

            if (result.success) {
                success('Welcome back to AtlasYield!')
                navigate('/dashboard')
            } else {
                setError(result.error || 'Invalid credentials')
            }
        } catch (err) {
            setError('An error occurred. Please try again.')
            showError('Login failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Sign in to access your investment portfolio</p>

            {error && (
                <div className="auth-error">
                    <AlertCircle size={18} />
                    {error}
                </div>
            )}

            <form className="auth-form" onSubmit={handleSubmit}>
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
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <button
                            type="button"
                            className="auth-input-action"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                <div className="auth-options">
                    <label className="auth-remember">
                        <input type="checkbox" />
                        Remember me
                    </label>
                    <Link to="/forgot-password" className="auth-forgot">
                        Forgot password?
                    </Link>
                </div>

                <button type="submit" className="auth-submit" disabled={loading}>
                    {loading ? (
                        <div className="loader" style={{ width: 20, height: 20, borderWidth: 2 }} />
                    ) : (
                        <>
                            Sign In
                            <ArrowRight size={18} />
                        </>
                    )}
                </button>
            </form>

            <div className="auth-switch">
                Don't have an account? <Link to="/register">Create account</Link>
            </div>
        </>
    )
}

export default Login

import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './AuthLayout.css'

function AuthLayout() {
    return (
        <div className="auth-layout">
            <div className="auth-background">
                <div className="auth-gradient-orb auth-gradient-orb-1" />
                <div className="auth-gradient-orb auth-gradient-orb-2" />
                <div className="auth-gradient-orb auth-gradient-orb-3" />
            </div>

            <div className="auth-container">
                <Link to="/" className="auth-logo">
                    <div className="auth-logo-icon">
                        <svg viewBox="0 0 100 100" width="40" height="40">
                            <defs>
                                <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style={{ stopColor: '#22c997' }} />
                                    <stop offset="100%" style={{ stopColor: '#0ea5e9' }} />
                                </linearGradient>
                            </defs>
                            <circle cx="50" cy="50" r="45" fill="url(#logoGrad)" />
                            <path d="M30 65 L50 25 L70 65 L50 55 Z" fill="white" opacity="0.95" />
                            <circle cx="50" cy="50" r="8" fill="white" opacity="0.9" />
                        </svg>
                    </div>
                    <span className="auth-logo-text">AtlasYield</span>
                </Link>

                <div className="auth-card">
                    <Outlet />
                </div>

                <div className="auth-footer">
                    <p>© 2024 AtlasYield. All rights reserved.</p>
                    <div className="auth-footer-links">
                        <Link to="/terms">Terms</Link>
                        <Link to="/privacy">Privacy</Link>
                        <Link to="/faq">FAQ</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthLayout

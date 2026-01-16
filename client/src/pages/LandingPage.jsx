import { Link } from 'react-router-dom'
import {
    TrendingUp,
    Shield,
    Zap,
    Users,
    BarChart3,
    Lock,
    ArrowRight,
    CheckCircle,
    Star
} from 'lucide-react'
import './LandingPage.css'

function LandingPage() {
    const stats = [
        { value: '$15M+', label: 'Assets Under Management' },
        { value: '12,000+', label: 'Active Investors' },
        { value: '98.5%', label: 'Satisfaction Rate' },
        { value: '24/7', label: 'Support Available' }
    ]

    const features = [
        {
            icon: Shield,
            title: 'Bank-Grade Security',
            description: 'Your investments are protected with military-grade encryption and 2FA authentication.'
        },
        {
            icon: TrendingUp,
            title: 'High Returns',
            description: 'Earn competitive returns with our diverse portfolio of investment strategies.'
        },
        {
            icon: Zap,
            title: 'Instant Processing',
            description: 'Quick deposits and withdrawals processed within 24-48 hours.'
        },
        {
            icon: BarChart3,
            title: 'Real-Time Analytics',
            description: 'Track your portfolio performance with advanced real-time dashboards.'
        },
        {
            icon: Users,
            title: 'Expert Support',
            description: 'Dedicated account managers and 24/7 customer support team.'
        },
        {
            icon: Lock,
            title: 'Regulated Platform',
            description: 'Fully compliant with international financial regulations and KYC/AML requirements.'
        }
    ]

    const plans = [
        { name: 'Starter', rate: '5%', duration: '30 days', min: '$100' },
        { name: 'Growth', rate: '12%', duration: '90 days', min: '$1,000', popular: true },
        { name: 'Premium', rate: '25%', duration: '180 days', min: '$5,000' }
    ]

    return (
        <div className="landing-page">
            {/* Navbar */}
            <nav className="landing-nav">
                <div className="landing-container">
                    <Link to="/" className="landing-logo">
                        <svg viewBox="0 0 100 100" width="40" height="40">
                            <defs>
                                <linearGradient id="landingLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style={{ stopColor: '#22c997' }} />
                                    <stop offset="100%" style={{ stopColor: '#0ea5e9' }} />
                                </linearGradient>
                            </defs>
                            <circle cx="50" cy="50" r="45" fill="url(#landingLogoGrad)" />
                            <path d="M30 65 L50 25 L70 65 L50 55 Z" fill="white" opacity="0.95" />
                            <circle cx="50" cy="50" r="8" fill="white" opacity="0.9" />
                        </svg>
                        <span>AtlasYield</span>
                    </Link>
                    <div className="landing-nav-links">
                        <a href="#features">Features</a>
                        <a href="#plans">Plans</a>
                        <Link to="/about">About</Link>
                        <Link to="/faq">FAQ</Link>
                    </div>
                    <div className="landing-nav-actions">
                        <Link to="/login" className="btn btn-ghost">Sign In</Link>
                        <Link to="/register" className="btn btn-primary">Get Started</Link>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="hero-section">
                <div className="hero-background">
                    <div className="hero-orb hero-orb-1" />
                    <div className="hero-orb hero-orb-2" />
                    <div className="hero-orb hero-orb-3" />
                </div>
                <div className="landing-container">
                    <div className="hero-content">
                        <span className="hero-badge">🚀 Trusted by 12,000+ investors worldwide</span>
                        <h1 className="hero-title">
                            Grow Your Wealth with <span className="gradient-text">Confidence</span>
                        </h1>
                        <p className="hero-subtitle">
                            Join the most trusted digital investment platform. Start earning competitive
                            returns on your investments with bank-grade security and expert guidance.
                        </p>
                        <div className="hero-actions">
                            <Link to="/register" className="btn btn-primary btn-lg">
                                Start Investing
                                <ArrowRight size={20} />
                            </Link>
                            <Link to="/investments/plans" className="btn btn-secondary btn-lg">
                                View Plans
                            </Link>
                        </div>
                        <div className="hero-trust">
                            <div className="hero-trust-item">
                                <CheckCircle size={18} style={{ color: 'var(--success)' }} />
                                <span>No hidden fees</span>
                            </div>
                            <div className="hero-trust-item">
                                <CheckCircle size={18} style={{ color: 'var(--success)' }} />
                                <span>Withdraw anytime</span>
                            </div>
                            <div className="hero-trust-item">
                                <CheckCircle size={18} style={{ color: 'var(--success)' }} />
                                <span>24/7 support</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="stats-section">
                <div className="landing-container">
                    <div className="stats-grid-landing">
                        {stats.map((stat, i) => (
                            <div key={i} className="stat-item">
                                <span className="stat-value">{stat.value}</span>
                                <span className="stat-label">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="features-section">
                <div className="landing-container">
                    <div className="section-header">
                        <h2>Why Choose AtlasYield?</h2>
                        <p>Built for investors who demand security, performance, and transparency</p>
                    </div>
                    <div className="features-grid">
                        {features.map((feature, i) => (
                            <div key={i} className="feature-card">
                                <div className="feature-icon">
                                    <feature.icon size={28} />
                                </div>
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Plans Preview */}
            <section id="plans" className="plans-section">
                <div className="landing-container">
                    <div className="section-header">
                        <h2>Investment Plans</h2>
                        <p>Choose the perfect plan that matches your investment goals</p>
                    </div>
                    <div className="plans-grid-landing">
                        {plans.map((plan, i) => (
                            <div key={i} className={`plan-card-landing ${plan.popular ? 'plan-popular-landing' : ''}`}>
                                {plan.popular && <span className="popular-tag"><Star size={14} /> Most Popular</span>}
                                <h3>{plan.name}</h3>
                                <div className="plan-rate-landing">
                                    <span className="rate">{plan.rate}</span>
                                    <span className="period">return</span>
                                </div>
                                <ul className="plan-details-landing">
                                    <li><CheckCircle size={16} /> Duration: {plan.duration}</li>
                                    <li><CheckCircle size={16} /> Min. Investment: {plan.min}</li>
                                    <li><CheckCircle size={16} /> Daily compounding</li>
                                    <li><CheckCircle size={16} /> Secure & insured</li>
                                </ul>
                                <Link to="/register" className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'} btn-lg`} style={{ width: '100%' }}>
                                    Get Started
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: 'var(--space-xl)' }}>
                        <Link to="/investments/plans" className="btn btn-ghost">
                            View All Plans <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="cta-section">
                <div className="landing-container">
                    <div className="cta-content">
                        <h2>Ready to Start Your Investment Journey?</h2>
                        <p>Join thousands of investors already growing their wealth with AtlasYield</p>
                        <Link to="/register" className="btn btn-primary btn-lg">
                            Create Free Account
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <div className="landing-container">
                    <div className="footer-grid">
                        <div className="footer-brand">
                            <div className="landing-logo" style={{ marginBottom: 'var(--space-lg)' }}>
                                <svg viewBox="0 0 100 100" width="36" height="36">
                                    <defs>
                                        <linearGradient id="footerLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" style={{ stopColor: '#22c997' }} />
                                            <stop offset="100%" style={{ stopColor: '#0ea5e9' }} />
                                        </linearGradient>
                                    </defs>
                                    <circle cx="50" cy="50" r="45" fill="url(#footerLogoGrad)" />
                                    <path d="M30 65 L50 25 L70 65 L50 55 Z" fill="white" opacity="0.95" />
                                    <circle cx="50" cy="50" r="8" fill="white" opacity="0.9" />
                                </svg>
                                <span>AtlasYield</span>
                            </div>
                            <p style={{ color: 'var(--text-muted)', maxWidth: 300 }}>
                                Your trusted partner for smart investments and wealth growth.
                            </p>
                        </div>
                        <div className="footer-links">
                            <h4>Platform</h4>
                            <Link to="/investments/plans">Investment Plans</Link>
                            <Link to="/register">Get Started</Link>
                            <Link to="/login">Sign In</Link>
                        </div>
                        <div className="footer-links">
                            <h4>Resources</h4>
                            <Link to="/faq">FAQ</Link>
                            <Link to="/terms">Terms of Service</Link>
                            <Link to="/privacy">Privacy Policy</Link>
                        </div>
                        <div className="footer-links">
                            <h4>Support</h4>
                            <a href="mailto:support@atlasyield.com">Contact Us</a>
                            <a href="#">Help Center</a>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>© 2024 AtlasYield. All rights reserved.</p>
                        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-xs)' }}>
                            Investments involve risk. Past performance does not guarantee future results.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default LandingPage

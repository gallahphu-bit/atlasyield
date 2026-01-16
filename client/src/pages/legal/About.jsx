import { Link } from 'react-router-dom'
import {
    ArrowLeft,
    Shield,
    Globe,
    Users,
    Award,
    Target,
    TrendingUp,
    CheckCircle
} from 'lucide-react'
import './Legal.css'

function About() {
    const team = [
        { name: 'Marcus Chen', role: 'CEO & Founder', image: '👨‍💼' },
        { name: 'Sarah Williams', role: 'Chief Investment Officer', image: '👩‍💼' },
        { name: 'David Park', role: 'Head of Technology', image: '👨‍💻' },
        { name: 'Emily Rodriguez', role: 'Director of Operations', image: '👩‍💻' }
    ]

    return (
        <div className="legal-page about-page">
            <div className="legal-container" style={{ maxWidth: 1000 }}>
                <Link to="/" className="back-link">
                    <ArrowLeft size={20} />
                    Back to Home
                </Link>

                <h1>About AtlasYield</h1>
                <p className="legal-updated" style={{ fontSize: 'var(--font-size-lg)' }}>
                    Empowering investors to build wealth with confidence since 2019
                </p>

                {/* Mission */}
                <section style={{ marginTop: 'var(--space-3xl)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-xl)' }}>
                        <div style={{ padding: 'var(--space-xl)', background: 'var(--bg-card)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)' }}>
                            <Target size={40} style={{ color: 'var(--primary)', marginBottom: 'var(--space-md)' }} />
                            <h3>Our Mission</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                To democratize wealth building by providing everyone access to institutional-grade investment opportunities with complete transparency.
                            </p>
                        </div>
                        <div style={{ padding: 'var(--space-xl)', background: 'var(--bg-card)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)' }}>
                            <TrendingUp size={40} style={{ color: 'var(--success)', marginBottom: 'var(--space-md)' }} />
                            <h3>Our Vision</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                To become the world's most trusted digital investment platform, helping millions achieve financial independence.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Stats */}
                <section style={{ marginTop: 'var(--space-3xl)', textAlign: 'center' }}>
                    <h2>Our Track Record</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-lg)', marginTop: 'var(--space-xl)' }}>
                        {[
                            { value: '$50M+', label: 'Assets Managed' },
                            { value: '25,000+', label: 'Happy Investors' },
                            { value: '99.9%', label: 'Uptime' },
                            { value: '5 Years', label: 'In Business' }
                        ].map((stat, i) => (
                            <div key={i}>
                                <p style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 700, background: 'linear-gradient(135deg, var(--primary), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                    {stat.value}
                                </p>
                                <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)' }}>{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Why Choose Us */}
                <section style={{ marginTop: 'var(--space-3xl)' }}>
                    <h2>Why Investors Trust Us</h2>
                    <div style={{ display: 'grid', gap: 'var(--space-md)', marginTop: 'var(--space-xl)' }}>
                        {[
                            { icon: Shield, title: 'Bank-Grade Security', desc: 'Your funds are protected by 256-bit encryption and stored in segregated accounts' },
                            { icon: Globe, title: 'Global Reach', desc: 'Serving investors in over 50 countries with 24/7 multilingual support' },
                            { icon: Award, title: 'Award-Winning Platform', desc: 'Recognized as Best Fintech Startup 2023 by Global Finance Awards' },
                            { icon: Users, title: 'Expert Team', desc: 'Led by investment professionals with 50+ years of combined experience' }
                        ].map((item, i) => (
                            <div key={i} style={{ display: 'flex', gap: 'var(--space-lg)', padding: 'var(--space-lg)', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                                <item.icon size={24} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: 4 }} />
                                <div>
                                    <h4 style={{ marginBottom: 'var(--space-xs)' }}>{item.title}</h4>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Team */}
                <section style={{ marginTop: 'var(--space-3xl)' }}>
                    <h2>Leadership Team</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-lg)', marginTop: 'var(--space-xl)' }}>
                        {team.map((member, i) => (
                            <div key={i} style={{ textAlign: 'center', padding: 'var(--space-xl)', background: 'var(--bg-card)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)' }}>
                                <div style={{ fontSize: '4rem', marginBottom: 'var(--space-md)' }}>{member.image}</div>
                                <h4>{member.name}</h4>
                                <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)' }}>{member.role}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section style={{ marginTop: 'var(--space-3xl)', textAlign: 'center', padding: 'var(--space-3xl)', background: 'linear-gradient(135deg, var(--bg-card), hsla(164, 72%, 45%, 0.1))', borderRadius: 'var(--radius-xl)', border: '1px solid var(--primary)' }}>
                    <h2>Ready to Start Investing?</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-xl)' }}>
                        Join thousands of investors growing their wealth with AtlasYield
                    </p>
                    <Link to="/register" className="btn btn-primary btn-lg">
                        Create Free Account
                    </Link>
                </section>
            </div>
        </div>
    )
}

export default About

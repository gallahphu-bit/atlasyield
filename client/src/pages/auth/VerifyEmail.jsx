import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Mail, ArrowRight, RotateCcw } from 'lucide-react'
import { useNotification } from '../../context/NotificationContext'

function VerifyEmail() {
    const location = useLocation()
    const navigate = useNavigate()
    const { success } = useNotification()

    const email = location.state?.email || 'your email'
    const [code, setCode] = useState(['', '', '', '', '', ''])
    const [loading, setLoading] = useState(false)
    const [resendTimer, setResendTimer] = useState(60)

    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
            return () => clearTimeout(timer)
        }
    }, [resendTimer])

    const handleCodeChange = (index, value) => {
        if (!/^\d*$/.test(value)) return

        const newCode = [...code]
        newCode[index] = value.slice(-1)
        setCode(newCode)

        // Auto-focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`code-${index + 1}`)
            nextInput?.focus()
        }
    }

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            const prevInput = document.getElementById(`code-${index - 1}`)
            prevInput?.focus()
        }
    }

    const handlePaste = (e) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData('text').slice(0, 6)
        if (/^\d+$/.test(pastedData)) {
            const newCode = [...code]
            pastedData.split('').forEach((char, i) => {
                if (i < 6) newCode[i] = char
            })
            setCode(newCode)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const fullCode = code.join('')

        if (fullCode.length !== 6) return

        setLoading(true)

        // Simulate verification
        await new Promise(resolve => setTimeout(resolve, 1500))

        success('Email verified successfully!')
        navigate('/login')
        setLoading(false)
    }

    const handleResend = async () => {
        setResendTimer(60)
        // Simulate resend
        await new Promise(resolve => setTimeout(resolve, 1000))
        success('Verification code resent!')
    }

    return (
        <>
            <div style={{
                width: 80,
                height: 80,
                margin: '0 auto var(--space-xl)',
                background: 'var(--primary-glow)',
                borderRadius: 'var(--radius-full)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Mail size={36} style={{ color: 'var(--primary)' }} />
            </div>

            <h1 className="auth-title">Verify Your Email</h1>
            <p className="auth-subtitle">
                We sent a 6-digit code to <strong style={{ color: 'var(--text-primary)' }}>{email}</strong>
            </p>

            <form className="auth-form" onSubmit={handleSubmit}>
                <div style={{
                    display: 'flex',
                    gap: 'var(--space-sm)',
                    justifyContent: 'center'
                }}>
                    {code.map((digit, index) => (
                        <input
                            key={index}
                            id={`code-${index}`}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleCodeChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={handlePaste}
                            style={{
                                width: 50,
                                height: 60,
                                textAlign: 'center',
                                fontSize: 'var(--font-size-2xl)',
                                fontWeight: 600,
                                background: 'var(--bg-secondary)',
                                border: digit ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                                borderRadius: 'var(--radius-md)',
                                color: 'var(--text-primary)',
                                outline: 'none',
                                transition: 'all var(--transition-fast)'
                            }}
                        />
                    ))}
                </div>

                <button
                    type="submit"
                    className="auth-submit"
                    disabled={loading || code.join('').length !== 6}
                >
                    {loading ? (
                        <div className="loader" style={{ width: 20, height: 20, borderWidth: 2 }} />
                    ) : (
                        <>
                            Verify Email
                            <ArrowRight size={18} />
                        </>
                    )}
                </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: 'var(--space-lg)' }}>
                {resendTimer > 0 ? (
                    <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)' }}>
                        Resend code in {resendTimer}s
                    </p>
                ) : (
                    <button
                        onClick={handleResend}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 'var(--space-sm)',
                            background: 'none',
                            border: 'none',
                            color: 'var(--primary)',
                            cursor: 'pointer',
                            fontSize: 'var(--font-size-sm)',
                            fontWeight: 500
                        }}
                    >
                        <RotateCcw size={16} />
                        Resend Code
                    </button>
                )}
            </div>

            <div className="auth-switch">
                Wrong email? <Link to="/register">Go back</Link>
            </div>
        </>
    )
}

export default VerifyEmail

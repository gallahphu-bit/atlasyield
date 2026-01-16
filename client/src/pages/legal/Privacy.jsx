import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import './Legal.css'

function Privacy() {
    return (
        <div className="legal-page">
            <div className="legal-container">
                <Link to="/" className="back-link">
                    <ArrowLeft size={20} />
                    Back to Home
                </Link>

                <h1>Privacy Policy</h1>
                <p className="legal-updated">Last updated: January 2024</p>

                <section>
                    <h2>1. Information We Collect</h2>
                    <p>
                        We collect information you provide directly to us, such as when you create an account,
                        make an investment, or contact us for support. This includes:
                    </p>
                    <ul>
                        <li>Personal identification information (name, email, phone number)</li>
                        <li>Financial information for transactions</li>
                        <li>Identity verification documents (KYC)</li>
                        <li>Usage data and analytics</li>
                    </ul>
                </section>

                <section>
                    <h2>2. How We Use Your Information</h2>
                    <p>We use the information we collect to:</p>
                    <ul>
                        <li>Process your investments and transactions</li>
                        <li>Verify your identity and prevent fraud</li>
                        <li>Communicate with you about your account</li>
                        <li>Improve our services and user experience</li>
                        <li>Comply with legal and regulatory requirements</li>
                    </ul>
                </section>

                <section>
                    <h2>3. Data Security</h2>
                    <p>
                        We implement industry-standard security measures to protect your personal information,
                        including encryption, secure servers, and regular security audits.
                    </p>
                </section>

                <section>
                    <h2>4. Data Sharing</h2>
                    <p>
                        We do not sell your personal information. We may share your information with trusted
                        third parties only when necessary to provide our services or comply with legal requirements.
                    </p>
                </section>

                <section>
                    <h2>5. Your Rights</h2>
                    <p>
                        You have the right to access, correct, or delete your personal information.
                        Contact us at privacy@atlasyield.com to exercise these rights.
                    </p>
                </section>

                <section>
                    <h2>6. Contact Us</h2>
                    <p>
                        If you have questions about this Privacy Policy, please contact us at privacy@atlasyield.com
                    </p>
                </section>
            </div>
        </div>
    )
}

export default Privacy

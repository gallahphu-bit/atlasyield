import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import './Legal.css'

function Terms() {
    return (
        <div className="legal-page">
            <div className="legal-container">
                <Link to="/" className="back-link">
                    <ArrowLeft size={20} />
                    Back to Home
                </Link>

                <h1>Terms of Service</h1>
                <p className="legal-updated">Last updated: January 2024</p>

                <section>
                    <h2>1. Agreement to Terms</h2>
                    <p>
                        By accessing or using the AtlasYield platform, you agree to be bound by these Terms of Service
                        and all applicable laws and regulations. If you do not agree with any of these terms, you are
                        prohibited from using or accessing this platform.
                    </p>
                </section>

                <section>
                    <h2>2. Use License</h2>
                    <p>
                        Permission is granted to temporarily access the materials (information or software) on AtlasYield's
                        platform for personal, non-commercial transitory viewing only. This is the grant of a license,
                        not a transfer of title.
                    </p>
                </section>

                <section>
                    <h2>3. Investment Risks</h2>
                    <p>
                        Investments involve risk, including the possible loss of principal. Past performance does not
                        guarantee future results. AtlasYield does not provide investment advice, and you should consult
                        with a qualified financial advisor before making any investment decisions.
                    </p>
                </section>

                <section>
                    <h2>4. Account Responsibilities</h2>
                    <p>
                        You are responsible for maintaining the confidentiality of your account and password. You agree
                        to accept responsibility for all activities that occur under your account.
                    </p>
                </section>

                <section>
                    <h2>5. Prohibited Activities</h2>
                    <ul>
                        <li>Using the platform for any illegal purpose</li>
                        <li>Attempting to gain unauthorized access to our systems</li>
                        <li>Transmitting malware or other harmful code</li>
                        <li>Engaging in money laundering or fraud</li>
                    </ul>
                </section>

                <section>
                    <h2>6. Limitation of Liability</h2>
                    <p>
                        AtlasYield shall not be liable for any indirect, incidental, special, consequential, or punitive
                        damages resulting from your access to or use of, or inability to access or use, the platform.
                    </p>
                </section>

                <section>
                    <h2>7. Contact Information</h2>
                    <p>
                        For any questions about these Terms of Service, please contact us at legal@atlasyield.com
                    </p>
                </section>
            </div>
        </div>
    )
}

export default Terms

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ChevronDown, ChevronUp, Search } from 'lucide-react'
import './Legal.css'

function FAQ() {
    const [search, setSearch] = useState('')
    const [openIndex, setOpenIndex] = useState(0)

    const faqs = [
        {
            question: 'How do I create an account?',
            answer: 'Creating an account is simple. Click "Get Started" on our homepage, enter your email and personal details, verify your email address, and complete the KYC verification process. Once verified, you can start investing immediately.'
        },
        {
            question: 'What are the minimum and maximum investment amounts?',
            answer: 'Investment limits vary by plan. Our Starter plan begins at $100, while Premium plans may require $5,000 or more. Maximum investments range from $5,000 to $500,000 depending on the plan. Check individual plan details for specific limits.'
        },
        {
            question: 'How long does withdrawal processing take?',
            answer: 'Withdrawal requests are typically processed within 1-3 business days. Bank transfers may take an additional 2-5 days depending on your bank. A $5 processing fee applies to all withdrawals.'
        },
        {
            question: 'Is my investment secure?',
            answer: 'Yes, we employ bank-grade security including 256-bit encryption, two-factor authentication, and secure data centers. All user funds are held in segregated accounts, and our platform undergoes regular security audits.'
        },
        {
            question: 'What is KYC and why is it required?',
            answer: 'KYC (Know Your Customer) is a verification process required by financial regulations to prevent fraud and money laundering. You\'ll need to submit a government ID and proof of address to complete verification.'
        },
        {
            question: 'Can I withdraw before my investment matures?',
            answer: 'Early withdrawal policies vary by plan. Flexible plans allow instant withdrawals, while fixed-term plans may have early withdrawal penalties (typically 5-10% of the invested amount). Check your specific plan terms for details.'
        },
        {
            question: 'How are returns calculated?',
            answer: 'Returns are calculated based on your investment amount and the plan\'s return rate. Most plans use daily or weekly compounding. You can track your returns in real-time through your dashboard.'
        },
        {
            question: 'What payment methods do you accept?',
            answer: 'We accept bank transfers (free), credit/debit cards (2.5% fee), and major cryptocurrencies (network fee). All methods are secure and processed through trusted payment providers.'
        }
    ]

    const filteredFaqs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(search.toLowerCase()) ||
        faq.answer.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="legal-page">
            <div className="legal-container">
                <Link to="/" className="back-link">
                    <ArrowLeft size={20} />
                    Back to Home
                </Link>

                <h1>Frequently Asked Questions</h1>
                <p className="legal-updated">Find answers to common questions about AtlasYield</p>

                <div className="faq-search">
                    <Search size={20} />
                    <input
                        type="text"
                        placeholder="Search questions..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="faq-list">
                    {filteredFaqs.map((faq, index) => (
                        <div key={index} className={`faq-item ${openIndex === index ? 'faq-open' : ''}`}>
                            <button
                                className="faq-question"
                                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                            >
                                <span>{faq.question}</span>
                                {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </button>
                            {openIndex === index && (
                                <div className="faq-answer">
                                    <p>{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="faq-contact">
                    <h3>Still have questions?</h3>
                    <p>Our support team is available 24/7 to help you.</p>
                    <a href="mailto:support@atlasyield.com" className="btn btn-primary">
                        Contact Support
                    </a>
                </div>
            </div>
        </div>
    )
}

export default FAQ

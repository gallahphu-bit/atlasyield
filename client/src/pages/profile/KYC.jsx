import { useState } from 'react'
import { FileCheck, Upload, CheckCircle, Clock, AlertCircle, X } from 'lucide-react'
import { useNotification } from '../../context/NotificationContext'
import '../dashboard/Dashboard.css'

function KYC() {
    const { success } = useNotification()
    const [documents, setDocuments] = useState({
        idDocument: { status: 'verified', file: 'passport.pdf' },
        addressProof: { status: 'verified', file: 'utility_bill.pdf' },
        selfie: { status: 'pending', file: null }
    })

    const getStatusBadge = (status) => {
        switch (status) {
            case 'verified':
                return <span className="badge badge-success"><CheckCircle size={12} /> Verified</span>
            case 'pending':
                return <span className="badge badge-warning"><Clock size={12} /> Pending</span>
            case 'rejected':
                return <span className="badge badge-danger"><AlertCircle size={12} /> Rejected</span>
            default:
                return <span className="badge badge-info">Not Submitted</span>
        }
    }

    const handleUpload = (docType) => {
        // Simulate upload
        setDocuments({
            ...documents,
            [docType]: { ...documents[docType], status: 'pending', file: 'uploaded_file.pdf' }
        })
        success('Document uploaded! Verification in progress.')
    }

    return (
        <div className="dashboard-page fade-in">
            <div className="welcome-section">
                <div>
                    <h1>KYC Verification</h1>
                    <p className="welcome-subtitle">Complete your identity verification to unlock all features</p>
                </div>
            </div>

            {/* Status Overview */}
            <div className="card" style={{ padding: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-lg)' }}>
                    <div style={{ width: 64, height: 64, borderRadius: 'var(--radius-lg)', background: 'var(--success-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FileCheck size={32} style={{ color: 'var(--success)' }} />
                    </div>
                    <div>
                        <h3 style={{ marginBottom: 'var(--space-xs)' }}>Verification Status: Approved</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            Your identity has been verified. You have full access to all platform features.
                        </p>
                    </div>
                </div>
            </div>

            {/* Document Cards */}
            <div style={{ display: 'grid', gap: 'var(--space-lg)' }}>
                {[
                    { key: 'idDocument', title: 'Government ID', description: 'Passport, Driver\'s License, or National ID' },
                    { key: 'addressProof', title: 'Proof of Address', description: 'Utility bill, Bank statement (last 3 months)' },
                    { key: 'selfie', title: 'Selfie Verification', description: 'Clear photo of yourself holding your ID' }
                ].map(doc => (
                    <div key={doc.key} className="card" style={{ padding: 'var(--space-xl)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-sm)' }}>
                                    <h3>{doc.title}</h3>
                                    {getStatusBadge(documents[doc.key].status)}
                                </div>
                                <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)' }}>{doc.description}</p>
                                {documents[doc.key].file && (
                                    <p style={{ marginTop: 'var(--space-sm)', fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                                        Uploaded: {documents[doc.key].file}
                                    </p>
                                )}
                            </div>
                            {documents[doc.key].status !== 'verified' && (
                                <label className="btn btn-secondary" style={{ cursor: 'pointer' }}>
                                    <Upload size={18} />
                                    Upload
                                    <input
                                        type="file"
                                        style={{ display: 'none' }}
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        onChange={() => handleUpload(doc.key)}
                                    />
                                </label>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Info Box */}
            <div style={{ marginTop: 'var(--space-xl)', padding: 'var(--space-lg)', background: 'var(--info-bg)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'flex-start', gap: 'var(--space-md)' }}>
                <AlertCircle size={20} style={{ color: 'var(--info)', flexShrink: 0, marginTop: 2 }} />
                <div>
                    <h4 style={{ marginBottom: 'var(--space-sm)', color: 'var(--info)' }}>Why is KYC required?</h4>
                    <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                        Know Your Customer (KYC) verification helps us maintain a secure platform, prevent fraud, and comply with
                        financial regulations. Your documents are encrypted and stored securely.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default KYC

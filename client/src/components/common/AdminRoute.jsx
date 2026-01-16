import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function AdminRoute({ children }) {
    const { user, isAuthenticated, loading } = useAuth()

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                background: 'var(--bg-primary)'
            }}>
                <div className="loader" />
            </div>
        )
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    if (user?.role !== 'admin') {
        return <Navigate to="/dashboard" replace />
    }

    return children
}

export default AdminRoute

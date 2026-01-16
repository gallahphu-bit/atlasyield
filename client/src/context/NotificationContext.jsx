import { createContext, useContext, useState, useCallback } from 'react'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'

const NotificationContext = createContext(null)

export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState([])

    const addNotification = useCallback((notification) => {
        const id = Date.now()
        const newNotification = {
            id,
            type: 'info',
            duration: 5000,
            ...notification
        }

        setNotifications(prev => [...prev, newNotification])

        if (newNotification.duration > 0) {
            setTimeout(() => {
                removeNotification(id)
            }, newNotification.duration)
        }

        return id
    }, [])

    const removeNotification = useCallback((id) => {
        setNotifications(prev => prev.filter(n => n.id !== id))
    }, [])

    const success = useCallback((message, options = {}) => {
        return addNotification({ type: 'success', message, ...options })
    }, [addNotification])

    const error = useCallback((message, options = {}) => {
        return addNotification({ type: 'error', message, ...options })
    }, [addNotification])

    const warning = useCallback((message, options = {}) => {
        return addNotification({ type: 'warning', message, ...options })
    }, [addNotification])

    const info = useCallback((message, options = {}) => {
        return addNotification({ type: 'info', message, ...options })
    }, [addNotification])

    const value = {
        notifications,
        addNotification,
        removeNotification,
        success,
        error,
        warning,
        info
    }

    const getIcon = (type) => {
        switch (type) {
            case 'success': return <CheckCircle size={20} />
            case 'error': return <AlertCircle size={20} />
            case 'warning': return <AlertTriangle size={20} />
            default: return <Info size={20} />
        }
    }

    const getStyles = (type) => {
        switch (type) {
            case 'success': return { borderLeft: '4px solid var(--success)', color: 'var(--success)' }
            case 'error': return { borderLeft: '4px solid var(--danger)', color: 'var(--danger)' }
            case 'warning': return { borderLeft: '4px solid var(--warning)', color: 'var(--warning)' }
            default: return { borderLeft: '4px solid var(--info)', color: 'var(--info)' }
        }
    }

    return (
        <NotificationContext.Provider value={value}>
            {children}

            {/* Toast Container */}
            <div className="toast-container">
                {notifications.map(notification => (
                    <div
                        key={notification.id}
                        className="toast"
                        style={getStyles(notification.type)}
                    >
                        <span style={{ color: getStyles(notification.type).color }}>
                            {getIcon(notification.type)}
                        </span>
                        <span style={{ flex: 1, color: 'var(--text-primary)' }}>
                            {notification.message}
                        </span>
                        <button
                            onClick={() => removeNotification(notification.id)}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--text-muted)',
                                cursor: 'pointer',
                                padding: '4px'
                            }}
                        >
                            <X size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </NotificationContext.Provider>
    )
}

export function useNotification() {
    const context = useContext(NotificationContext)
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider')
    }
    return context
}

export default NotificationContext

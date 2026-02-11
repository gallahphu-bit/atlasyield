import { useState } from 'react'
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom'
import {
    LayoutDashboard,
    PieChart,
    TrendingUp,
    Wallet,
    ArrowDownToLine,
    ArrowUpFromLine,
    History,
    User,
    Shield,
    FileCheck,
    Settings,
    LogOut,
    Menu,
    X,
    Users,
    BarChart3,
    CreditCard,
    Bell,
    ChevronDown
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import './DashboardLayout.css'
import './MobileSidebarFix.css'

function DashboardLayout({ isAdmin = false }) {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [userMenuOpen, setUserMenuOpen] = useState(false)

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    const userNavItems = [
        {
            section: 'Overview',
            items: [
                { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
                { icon: PieChart, label: 'Portfolio', path: '/portfolio' },
            ]
        },
        {
            section: 'Investments',
            items: [
                { icon: TrendingUp, label: 'Investment Plans', path: '/investments/plans' },
                { icon: BarChart3, label: 'My Investments', path: '/investments/my-investments' },
            ]
        },
        {
            section: 'Wallet',
            items: [
                { icon: Wallet, label: 'Wallet', path: '/wallet' },
                { icon: ArrowDownToLine, label: 'Deposit', path: '/wallet/deposit' },
                { icon: ArrowUpFromLine, label: 'Withdraw', path: '/wallet/withdraw' },
                { icon: History, label: 'Transactions', path: '/wallet/transactions' },
            ]
        },
        {
            section: 'Account',
            items: [
                { icon: User, label: 'Profile', path: '/profile' },
                { icon: Shield, label: 'Security', path: '/profile/security' },
                { icon: FileCheck, label: 'KYC Verification', path: '/profile/kyc' },
            ]
        }
    ]

    const adminNavItems = [
        {
            section: 'Admin',
            items: [
                { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
                { icon: Users, label: 'Users', path: '/admin/users' },
                { icon: Settings, label: 'User Management', path: '/admin/user-management' },
                { icon: TrendingUp, label: 'Investment Plans', path: '/admin/plans' },
                { icon: CreditCard, label: 'Transactions', path: '/admin/transactions' },
            ]
        }
    ]

    const navItems = isAdmin ? adminNavItems : userNavItems

    return (
        <div className="dashboard-layout">
            {/* Mobile Overlay */}
            <div
                className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
            />

            {/* Sidebar */}
            <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
                <div className="sidebar-header">
                    <button
                        className="sidebar-close"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X size={24} />
                        <span style={{ marginLeft: '10px', fontSize: '1rem', fontWeight: '500' }}>Close Menu</span>
                    </button>
                </div>

                <nav className="sidebar-nav">
                    {navItems.map((group, groupIndex) => (
                        <div key={groupIndex} className="nav-group">
                            <span className="nav-group-title">{group.section}</span>
                            <ul className="nav-list">
                                {group.items.map((item, itemIndex) => (
                                    <li key={itemIndex}>
                                        <NavLink
                                            to={item.path}
                                            className={({ isActive }) =>
                                                `nav-link ${isActive ? 'nav-link-active' : ''}`
                                            }
                                            onClick={() => setSidebarOpen(false)}
                                        >
                                            <item.icon size={20} />
                                            <span>{item.label}</span>
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <button className="logout-btn" onClick={handleLogout}>
                        <LogOut size={20} />
                        <span>Log Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="dashboard-main">
                {/* Top Navbar */}
                <header className="dashboard-navbar">
                    <div className="navbar-left">
                        <button
                            className="menu-toggle"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                        <div className="page-title">
                            {location.pathname === '/dashboard' && 'Dashboard'}
                            {location.pathname === '/portfolio' && 'Portfolio'}
                            {location.pathname.includes('/investments') && 'Investments'}
                            {location.pathname.includes('/wallet') && 'Wallet'}
                            {location.pathname.includes('/profile') && 'Profile'}
                            {location.pathname.includes('/admin') && 'Admin Panel'}
                        </div>
                    </div>

                    <div className="navbar-right">
                        <button className="navbar-btn notification-btn">
                            <Bell size={20} />
                            <span className="notification-dot" />
                        </button>

                        <div className="user-menu-container">
                            <button
                                className="user-menu-trigger"
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                            >
                                <div className="avatar avatar-sm">
                                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                                </div>
                                <div className="user-info">
                                    <span className="user-name">{user?.firstName} {user?.lastName}</span>
                                    <span className="user-email">{user?.email}</span>
                                </div>
                                <ChevronDown size={16} className={`chevron ${userMenuOpen ? 'chevron-open' : ''}`} />
                            </button>

                            {userMenuOpen && (
                                <>
                                    <div
                                        className="user-menu-overlay"
                                        onClick={() => setUserMenuOpen(false)}
                                    />
                                    <div className="user-menu">
                                        <NavLink to="/profile" className="user-menu-item" onClick={() => setUserMenuOpen(false)}>
                                            <User size={18} />
                                            Profile
                                        </NavLink>
                                        <NavLink to="/profile/security" className="user-menu-item" onClick={() => setUserMenuOpen(false)}>
                                            <Shield size={18} />
                                            Security
                                        </NavLink>
                                        <NavLink to="/profile/settings" className="user-menu-item" onClick={() => setUserMenuOpen(false)}>
                                            <Settings size={18} />
                                            Settings
                                        </NavLink>
                                        <div className="user-menu-divider" />
                                        <button className="user-menu-item user-menu-logout" onClick={handleLogout}>
                                            <LogOut size={18} />
                                            Log Out
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="dashboard-content">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default DashboardLayout

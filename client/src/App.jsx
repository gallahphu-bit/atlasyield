import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { NotificationProvider } from './context/NotificationContext'

// Layouts
import DashboardLayout from './components/layout/DashboardLayout'
import AuthLayout from './components/layout/AuthLayout'

// Auth Pages
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'
import VerifyEmail from './pages/auth/VerifyEmail'

// Dashboard Pages
import Dashboard from './pages/dashboard/Dashboard'
import Portfolio from './pages/dashboard/Portfolio'

// Investment Pages
import Plans from './pages/investments/Plans'
import MyInvestments from './pages/investments/MyInvestments'
import NewInvestment from './pages/investments/NewInvestment'

// Wallet Pages
import Wallet from './pages/wallet/Wallet'
import Deposit from './pages/wallet/Deposit'
import Withdraw from './pages/wallet/Withdraw'
import Transactions from './pages/wallet/Transactions'

// Profile Pages
import Profile from './pages/profile/Profile'
import Security from './pages/profile/Security'
import KYC from './pages/profile/KYC'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminUsers from './pages/admin/AdminUsers'
import AdminPlans from './pages/admin/AdminPlans'
import AdminTransactions from './pages/admin/AdminTransactions'

// Legal Pages
import LandingPage from './pages/LandingPage'
import Terms from './pages/legal/Terms'
import Privacy from './pages/legal/Privacy'
import FAQ from './pages/legal/FAQ'
import About from './pages/legal/About'

// Protected Route Component
import ProtectedRoute from './components/common/ProtectedRoute'
import AdminRoute from './components/common/AdminRoute'
import WhatsAppButton from './components/common/WhatsAppButton'

function App() {
    return (
        <AuthProvider>
            <NotificationProvider>
                <Router>
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/faq" element={<FAQ />} />
                        <Route path="/about" element={<About />} />

                        {/* Auth Routes */}
                        <Route element={<AuthLayout />}>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/forgot-password" element={<ForgotPassword />} />
                            <Route path="/verify-email" element={<VerifyEmail />} />
                        </Route>

                        {/* Protected Dashboard Routes */}
                        <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/portfolio" element={<Portfolio />} />

                            {/* Investments */}
                            <Route path="/investments/plans" element={<Plans />} />
                            <Route path="/investments/my-investments" element={<MyInvestments />} />
                            <Route path="/investments/new/:planId" element={<NewInvestment />} />

                            {/* Wallet */}
                            <Route path="/wallet" element={<Wallet />} />
                            <Route path="/wallet/deposit" element={<Deposit />} />
                            <Route path="/wallet/withdraw" element={<Withdraw />} />
                            <Route path="/wallet/transactions" element={<Transactions />} />

                            {/* Profile */}
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/profile/security" element={<Security />} />
                            <Route path="/profile/kyc" element={<KYC />} />
                        </Route>

                        {/* Admin Routes */}
                        <Route element={<AdminRoute><DashboardLayout isAdmin /></AdminRoute>}>
                            <Route path="/admin" element={<AdminDashboard />} />
                            <Route path="/admin/users" element={<AdminUsers />} />
                            <Route path="/admin/plans" element={<AdminPlans />} />
                            <Route path="/admin/transactions" element={<AdminTransactions />} />
                        </Route>

                        {/* Catch all */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                    <WhatsAppButton />
                </Router>
            </NotificationProvider>
        </AuthProvider>
    )
}

export default App

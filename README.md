# AtlasYield Investment Platform

A professional, secure investment platform with full-stack architecture built with React and Node.js.

## 🚀 Features

### User Features
- **Authentication**: Secure registration, login, email verification, 2FA
- **Dashboard**: Real-time portfolio overview with charts
- **Investments**: Multiple investment plans with different risk levels
- **Wallet**: Deposits, withdrawals, transaction history
- **Profile**: Personal info management, KYC verification, security settings

### Admin Features
- **Dashboard**: Platform analytics and statistics
- **User Management**: View, suspend, and manage users
- **Investment Plans**: CRUD operations for investment plans
- **Transactions**: Approve/reject deposit and withdrawal requests

## 🛠 Tech Stack

### Frontend
- React 18 + Vite
- React Router v6
- Recharts for data visualization
- Lucide React for icons
- Vanilla CSS with design system

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT for authentication
- bcrypt for password hashing
- Express Validator

## 📦 Installation

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`

### Backend Setup

```bash
cd server
npm install
cp .env.example .env
# Edit .env with your settings
npm run dev
```

Backend runs on `http://localhost:5000`

## 🌐 Deployment

### Frontend (Netlify)
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `client/dist`
4. Add environment variables if needed

### Backend (Railway/Render)
1. Create a new project on Railway or Render
2. Connect your GitHub repository
3. Set environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A strong random string
   - `NODE_ENV`: `production`
4. Deploy

## 📁 Project Structure

```
atlasyield/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── context/        # React contexts
│   │   ├── data/           # Mock data
│   │   ├── pages/          # Page components
│   │   ├── App.jsx         # Main app
│   │   └── index.css       # Design system
│   └── package.json
├── server/                 # Express Backend
│   ├── src/
│   │   ├── middleware/     # Auth middleware
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   └── index.js        # Server entry
│   └── package.json
├── netlify.toml            # Netlify config
└── README.md
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/verify-email` - Email verification
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset

### User
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update profile
- `POST /api/user/change-password` - Change password

### Investments
- `GET /api/investments/plans` - List all plans
- `GET /api/investments` - User's investments
- `POST /api/investments` - Create investment

### Wallet
- `GET /api/wallet` - Get wallet balance
- `POST /api/wallet/deposit` - Request deposit
- `POST /api/wallet/withdraw` - Request withdrawal
- `GET /api/wallet/transactions` - Transaction history

### Admin
- `GET /api/admin/stats` - Platform statistics
- `GET /api/admin/users` - All users
- `PUT /api/admin/transactions/:id` - Approve/reject transaction

## ⚠️ Important Notes

This is a **demonstration/template** project. For production use:

1. **Security**: Conduct a professional security audit
2. **Payment Gateway**: Integrate real payment providers (Stripe, etc.)
3. **KYC/AML**: Integrate identity verification services
4. **Legal**: Consult with legal professionals for compliance
5. **SSL**: Ensure HTTPS is enabled
6. **Rate Limiting**: Add rate limiting to API endpoints
7. **Logging**: Implement proper logging and monitoring

## 📄 License

MIT License - feel free to use this project as a starting point.

---

Built with ❤️ by AtlasYield Team

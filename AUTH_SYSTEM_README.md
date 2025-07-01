# 🔐 Aurenix AI Authentication System

A complete authentication system built with **FastAPI** (backend) and **Next.js** (frontend), using **Supabase PostgreSQL** as the database.

## ✅ System Overview

This implementation provides a secure, production-ready authentication system with:

- **JWT-based authentication** with access and refresh tokens
- **Password hashing** using bcrypt
- **Token refresh mechanism** for seamless user experience
- **Protected routes** on both frontend and backend
- **Clean architecture** with separation of concerns
- **Modern UI** with Tailwind CSS

## 🛠 Tech Stack

### Backend (FastAPI)
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - ORM for database operations
- **Alembic** - Database migrations
- **PostgreSQL** - Database (Supabase)
- **JWT** - Token-based authentication
- **bcrypt** - Password hashing
- **Pydantic** - Data validation

### Frontend (Next.js)
- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Context** - State management
- **js-cookie** - Cookie management
- **Framer Motion** - Animations

## 🚀 Quick Start

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd /home/yashpotdar/projects/aurenix.ai/backend
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure environment variables:**
   ```bash
   # Edit .env file with your Supabase credentials
   cp .env.example .env
   ```

4. **Run database migrations:**
   ```bash
   alembic upgrade head
   ```

5. **Start the server:**
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd /home/yashpotdar/projects/aurenix.ai/frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   ```bash
   # .env.local is already configured
   echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

## 📋 API Endpoints

### Authentication Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/signup` | Register a new user |
| `POST` | `/api/auth/login` | Login user and get tokens |
| `POST` | `/api/auth/refresh` | Refresh access token |
| `POST` | `/api/auth/logout` | Logout and revoke tokens |

### User Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/users/me` | Get current user info (protected) |

### Example Usage

#### Signup
```bash
curl -X POST "http://localhost:8000/api/auth/signup" \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "securepassword"}'
```

#### Login
```bash
curl -X POST "http://localhost:8000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "securepassword"}'
```

#### Access Protected Route
```bash
curl -X GET "http://localhost:8000/api/users/me" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## 🔒 Security Features

- **Password Hashing**: Uses bcrypt with salt for secure password storage
- **JWT Tokens**: 
  - Access tokens: 15-minute expiry
  - Refresh tokens: 7-day expiry
- **Token Storage**: HTTP-only cookies in production
- **CORS Protection**: Configured for development and production
- **Input Validation**: Email and password validation
- **SQL Injection Protection**: SQLAlchemy ORM prevents SQL injection

## 📁 Project Structure

```
backend/
├── app/
│   ├── api/
│   │   └── routes/
│   │       ├── auth.py          # Authentication endpoints
│   │       └── users.py         # User endpoints
│   ├── core/
│   │   ├── config.py           # Application configuration
│   │   ├── security.py         # JWT and password utilities
│   │   └── dependencies.py     # FastAPI dependencies
│   ├── database/
│   │   └── database.py         # Database configuration
│   ├── models/
│   │   └── models.py           # SQLAlchemy models
│   ├── schemas/
│   │   └── schemas.py          # Pydantic schemas
│   ├── services/
│   │   └── auth_service.py     # Authentication business logic
│   └── main.py                 # FastAPI application
├── alembic/                    # Database migrations
├── .env                        # Environment variables
└── requirements.txt            # Python dependencies

frontend/
├── src/
│   ├── app/                    # Next.js app router
│   ├── components/
│   │   ├── AuthForm.tsx        # Login/signup form
│   │   ├── UserButton.tsx      # User dropdown menu
│   │   ├── ProtectedRoute.tsx  # Route protection wrapper
│   │   └── ...
│   ├── contexts/
│   │   └── AuthContext.tsx     # Authentication context
│   └── lib/
│       ├── auth-api.ts         # API client for auth
│       └── token-manager.ts    # Token management utilities
├── .env.local                  # Environment variables
└── package.json                # Node.js dependencies
```

## 🧪 Testing

### Backend Testing

Run the provided test script:
```bash
cd backend
python test_auth.py
```

This tests:
- User signup
- User login  
- Protected endpoint access
- Token refresh functionality

### Manual Testing

1. **Visit** `http://localhost:3000`
2. **Click** "Get Started" to go to login page
3. **Sign up** with a new account
4. **Verify** redirect to dashboard
5. **Test** logout functionality

## 🌍 Environment Configuration

### Backend (.env)
```env
# Database Configuration
DATABASE_URL=postgresql://postgres:<password>@db.psyofwalkakpxwvgxhsp.supabase.co:5432/postgres

# JWT Configuration  
JWT_SECRET_KEY=your-super-secret-jwt-key-here-change-this-in-production
JWT_ALGORITHM=HS256
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=15
JWT_REFRESH_TOKEN_EXPIRE_DAYS=7

# Application Configuration
APP_NAME=Aurenix AI
APP_VERSION=1.0.0
DEBUG=True

# CORS Settings
ALLOWED_ORIGINS=["http://localhost:3000", "http://127.0.0.1:3000"]
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 🚀 Production Deployment

### Backend Deployment
1. Set secure `JWT_SECRET_KEY`
2. Use production database URL
3. Set `DEBUG=False`
4. Configure proper CORS origins
5. Use HTTPS

### Frontend Deployment
1. Update `NEXT_PUBLIC_API_URL` to production backend URL
2. Ensure secure cookie settings
3. Configure proper environment variables

## 📚 Key Features Implemented

✅ **Complete Authentication Flow**
- User registration with email validation
- Secure login with JWT tokens
- Token refresh mechanism
- Logout with token revocation

✅ **Security Best Practices**
- Password hashing with bcrypt
- JWT tokens with proper expiration
- Protected routes and endpoints
- Input validation and sanitization

✅ **Modern UI/UX**
- Responsive design with Tailwind CSS
- Loading states and error handling
- Smooth animations with Framer Motion
- Clean, intuitive user interface

✅ **Scalable Architecture**
- Clean separation of concerns
- Reusable components and utilities
- Type-safe TypeScript implementation
- Modular backend structure

## 🛠 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify Supabase credentials in `.env`
   - Check network connectivity
   - Ensure database is accessible

2. **CORS Issues**
   - Verify `ALLOWED_ORIGINS` in backend `.env`
   - Check frontend URL configuration

3. **Token Errors**
   - Ensure `JWT_SECRET_KEY` is set
   - Check token expiration settings
   - Verify token format

### Development Tips

- Use the test script to verify backend functionality
- Check browser console for frontend errors
- Monitor network requests in browser dev tools
- Use FastAPI docs at `http://localhost:8000/docs`

## 🎉 Success!

Your authentication system is now fully functional with:

- **Secure JWT-based authentication**
- **Modern, responsive UI**
- **Production-ready security features**
- **Scalable architecture**
- **Complete user management**

The system is ready for further development and can be extended with additional features like email verification, password reset, and more advanced user management capabilities.

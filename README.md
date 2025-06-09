
# SharesWebsite – MERN Stack Auth & Dashboard

A full-stack MERN (MongoDB, Express, React, Node.js) application with secure login/signup, JWT-based user authentication, responsive dashboard, dark/light toggle, and animated UI components.

## 🚀 Features

- 📱 Mobile-first responsive UI  
- 🔐 Signup/Login with validation  
- 🔁 JWT-based protected routes  
- 👤 User-specific dashboard  
- 💡 Typed user greeting with `react-typed`  
- 🌗 Dark/Light toggle & animations  
- 🔐 Logout functionality with confirmation  
- ☑️ Basic & advanced validations  

## 🗂️ Folder Structure

```
SharesWebsite/
├── backend/
│   ├── controllers/
│   │   └── authController.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── authRoutes.js
│   ├── .env
│   └── server.js
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── ProtectedRoute.jsx
│       │   └── ThemeToggle.jsx
│       ├── pages/
│       │   ├── LoginPage.jsx
│       │   ├── SignupPage.jsx
│       │   └── Dashboard.jsx
│       ├── App.js
│       ├── index.js
│       ├── index.css
│       └── api/
│           └── auth.js
├── .gitignore
└── README.md
```

## 📦 Backend Setup

1. Navigate to `/backend`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=5000
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

## 💻 Frontend Setup

1. Navigate to `/frontend`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the client:
   ```bash
   npm start
   ```

## 🛡️ Authentication Flow

- Signup stores new users in MongoDB with hashed passwords using bcrypt.
- Login returns a JWT, saved in localStorage/sessionStorage.
- JWT decoded for personalized dashboard.
- Protected routes block unauthenticated users.
- Logout clears token and redirects to login.

## 📝 Technologies Used

- **Frontend**: React, Tailwind CSS, Framer Motion, React Icons, React Router, React Toastify, React Typed
- **Backend**: Express, Mongoose, JWT, Bcrypt
- **Database**: MongoDB Atlas

## 🔐 Authorizations

- Secure password hashing
- JWT authentication
- Session/token validation on dashboard route

## 🎨 UI/UX

- Fully responsive design
- Interactive transitions
- Animated inputs and buttons
- Accessible navigation with dark/light theme switch

---

> Built with ❤️ for secure, beautiful and scalable MERN apps.

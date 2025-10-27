# Real Estate Platform

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=flat)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

> A full-stack real estate property listing and management platform enabling users to browse, search, and manage property listings with secure authentication.

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## 🏠 Overview

This Real Estate Platform is a modern web application built with the MERN stack (MongoDB, Express.js, React, Node.js) that provides a comprehensive solution for property listing management. Users can browse available properties, search by various criteria, and manage their listings through an intuitive interface.

## ✨ Features

- **User Authentication & Authorization**: Secure registration and login system with bcrypt password hashing
- **Property Listings Management**: Create, read, update, and delete property listings
- **Advanced Search & Filtering**: Search properties by location, price range, property type, and amenities
- **Responsive Design**: Mobile-first responsive UI for seamless experience across devices
- **User Dashboard**: Personalized dashboard for managing user properties and preferences
- **Image Upload**: Property image upload and management functionality
- **Real-time Updates**: Dynamic content updates without page refresh
- **Secure API**: RESTful API with JWT-based authentication

## 🛠 Technologies Used

### Frontend
- **React.js** - Component-based UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **CSS3** - Modern styling and animations

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **bcryptjs** - Password hashing and security
- **JSON Web Tokens (JWT)** - Authentication and authorization
- **CORS** - Cross-origin resource sharing

### Development Tools
- **npm** - Package management
- **Nodemon** - Development server auto-reload

## 🏗 Architecture

```
Client (React) → API Layer (Express) → Database (MongoDB)
     ↓                    ↓                    ↓
  Components         Controllers           Collections
     ↓                    ↓                    ↓
   Routes            Middleware            Schemas
```

## 📦 Prerequisites

Before running this application, ensure you have:

- **Node.js** (v14.0.0 or higher)
- **npm** (v6.0.0 or higher)
- **MongoDB** (v4.0 or higher) - Local installation or MongoDB Atlas account
- **Git** - Version control

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Floyd-Pinto/Real-Estate.git
cd Real-Estate
```

### 2. Install Backend Dependencies
```bash
cd real-estate-backend
npm install
```

### 3. Install Frontend Dependencies
```bash
cd ../real-estate-frontend
npm install
```

## ⚙ Configuration

### Backend Environment Variables

Create a `.env` file in the `real-estate-backend` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/real-estate
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

### Frontend Configuration

Create a `.env` file in the `real-estate-frontend` directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 📖 Usage

### Development Mode

**Start Backend Server:**
```bash
cd real-estate-backend
npm run dev
```
Backend will run on `http://localhost:5000`

**Start Frontend Development Server:**
```bash
cd real-estate-frontend
npm start
```
Frontend will run on `http://localhost:3000`

### Production Build

**Build Frontend:**
```bash
cd real-estate-frontend
npm run build
```

**Start Production Server:**
```bash
cd real-estate-backend
npm start
```

## 📡 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | User login |
| GET | `/api/auth/profile` | Get user profile (Protected) |

### Property Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/properties` | Get all properties |
| GET | `/api/properties/:id` | Get property by ID |
| POST | `/api/properties` | Create new property (Protected) |
| PUT | `/api/properties/:id` | Update property (Protected) |
| DELETE | `/api/properties/:id` | Delete property (Protected) |

### Search Endpoint

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/properties/search?query=...` | Search properties with filters |

## 📁 Project Structure

```
Real-Estate/
├── real-estate-backend/
│   ├── config/
│   │   └── db.js                 # Database configuration
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   └── propertyController.js # Property management logic
│   ├── middleware/
│   │   └── auth.js               # JWT authentication middleware
│   ├── models/
│   │   ├── User.js               # User schema
│   │   └── Property.js           # Property schema
│   ├── routes/
│   │   ├── auth.js               # Auth routes
│   │   └── properties.js         # Property routes
│   ├── server.js                 # Express server setup
│   └── package.json
│
├── real-estate-frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js         # Navigation component
│   │   │   ├── PropertyCard.js   # Property display component
│   │   │   └── SearchBar.js      # Search functionality
│   │   ├── pages/
│   │   │   ├── Home.js           # Landing page
│   │   │   ├── Login.js          # Login page
│   │   │   ├── Register.js       # Registration page
│   │   │   ├── Properties.js     # Property listings
│   │   │   └── Dashboard.js      # User dashboard
│   │   ├── services/
│   │   │   └── api.js            # API service layer
│   │   ├── App.js                # Main application component
│   │   └── index.js              # Entry point
│   └── package.json
│
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards
- Follow ESLint configuration
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation for new features

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Floyd Pinto**
- GitHub: [@Floyd-Pinto](https://github.com/Floyd-Pinto)

## 🙏 Acknowledgments

- MongoDB documentation and community
- Express.js framework
- React.js library
- Node.js ecosystem
- bcrypt.js for secure password hashing

---

**Maintained by**: [Floyd Pinto](https://github.com/Floyd-Pinto)  
**Last Updated**: November 2024

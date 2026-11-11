# Real Estate Platform

[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=flat)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white)](https://www.mysql.com/)

> A property listing app where users can sign up, browse and add properties, and leave reviews and ratings.

**Note:** this is an early project from my second year of college, built while learning full-stack development. For a more complete take on the same idea, see [ApnaGhar](https://github.com/Floyd-Pinto/ApnaGhar).

## Features

- Sign up and log in, with passwords hashed using bcrypt
- Browse all property listings
- Add a property (address, price, age, furnished status)
- Leave a text review and star rating on a property
- React frontend with Material UI

## Tech Stack

| Layer | Tools |
|---|---|
| Frontend | React 18, React Router, Material UI, Axios |
| Backend | Node.js, Express |
| Database | MySQL (`mysql2`) |
| Auth | bcrypt password hashing |

## Project Structure

```
Real-Estate/
├── real-estate-backend/
│   ├── server.js           # Express API and MySQL connection
│   ├── hashPasswords.js    # One-off script to hash existing plain-text passwords
│   └── .env.example        # Database and server settings
└── real-estate-frontend/
    └── src/
        ├── App.js
        └── components/     # Home, Login, Signup, Dashboard, PropertyList, PropertyForm, ReviewForm
```

## Running Locally

**Requirements:** Node.js 16+ and MySQL 8.

1. Create the database and tables:

   ```sql
   CREATE DATABASE Real_Estate;
   USE Real_Estate;

   CREATE TABLE user (
     user_id INT AUTO_INCREMENT PRIMARY KEY,
     username VARCHAR(50) UNIQUE NOT NULL,
     contact_no VARCHAR(15),
     email VARCHAR(100),
     password VARCHAR(255) NOT NULL
   );

   CREATE TABLE property (
     property_id INT AUTO_INCREMENT PRIMARY KEY,
     address VARCHAR(255) NOT NULL,
     price DECIMAL(12, 2),
     age INT,
     furnished_status VARCHAR(30)
   );

   CREATE TABLE review (
     review_id INT AUTO_INCREMENT PRIMARY KEY,
     text_review TEXT,
     rating INT,
     reviewer_id INT,
     property_id INT,
     FOREIGN KEY (reviewer_id) REFERENCES user(user_id),
     FOREIGN KEY (property_id) REFERENCES property(property_id)
   );
   ```

2. Start the backend (runs on port 5000):

   ```bash
   cd real-estate-backend
   cp .env.example .env    # then fill in your MySQL username and password
   npm install
   node server.js
   ```

3. Start the frontend (runs on port 3000):

   ```bash
   cd real-estate-frontend
   npm install
   npm start
   ```

## API

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/signup` | Create an account |
| POST | `/api/user-login` | Log in |
| GET | `/api/properties` | List all properties |
| POST | `/api/add-property` | Add a property |
| GET | `/api/reviews` | List all reviews |
| POST | `/api/add-review` | Add a review to a property |

## What I'd Do Differently Now

- Issue real JWTs on login (the login route currently returns a placeholder token)
- Move the hard-coded `localhost:5000` API URLs in the frontend into an environment variable
- Add input validation and tests

const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'zenox',           // Change to your DB username
    password: 'Dormamu787@', // Change to your DB password
    database: 'Real_Estate', // Your database name
});

db.connect((err) => {
    if (err) {
        console.error('DB connection failed:', err.message);
        return;
    }
    console.log('Connected to MySQL');
});


// Login route
app.post('/api/user-login', (req, res) => {
  const { username, password } = req.body;
  
  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  // Query the database to fetch user information
  db.query('SELECT * FROM user WHERE username = ?', [username], async (err, results) => {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({ error: 'An error occurred while querying the database' });
    }
    
    if (results.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }

    try {
      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);
      
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Return user details, including reviewer_id and authToken (JWT or any token)
      res.status(200).json({
        message: 'Login successful',
        reviewer_id: user.user_id,  // This should be sent back as reviewer_id
        authToken: 'your-auth-token-here',  // Replace with actual JWT or token logic
        user,
      });
    } catch (compareError) {
      console.error('Error comparing password:', compareError.message);
      res.status(500).json({ error: 'Failed to verify password' });
    }
  });
});


// Improved error handling for User Signup Route
app.post('/api/signup', async (req, res) => {
    const { username, contact_no, email, password } = req.body;
    if (!username || !contact_no || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    db.query('SELECT * FROM user WHERE username = ?', [username], async (err, results) => {
        if (err) {
            console.error('Database error during signup:', err.message);
            return res.status(500).json({ error: 'An error occurred while checking username availability' });
        }
        if (results.length > 0) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            db.query('INSERT INTO user (username, contact_no, email, password) VALUES (?, ?, ?, ?)',
                [username, contact_no, email, hashedPassword],
                (err, result) => {
                    if (err) {
                        console.error('Error while inserting new user:', err.message);
                        return res.status(500).json({ error: 'Failed to register user' });
                    }
                    res.status(201).json({ message: 'User registered successfully' });
                });
        } catch (hashError) {
            console.error('Error hashing password:', hashError.message);
            res.status(500).json({ error: 'Failed to process password' });
        }
    });
});

// Get all properties
app.get('/api/properties', (req, res) => {
    db.query('SELECT * FROM property', (err, results) => {
        if (err) {
          console.error('Error fetching properties:', err.message);
          return res.status(500).json({ error: 'Failed to fetch properties' });
        }
        res.status(200).json(results);
      });
  });

// Backend route to fetch all reviews for all properties
app.get('/api/reviews', (req, res) => {
  db.query('SELECT * FROM review', (err, results) => {
    if (err) {
      console.error('Error fetching reviews:', err.message);
      return res.status(500).json({ error: 'Failed to fetch reviews' });
    }
    res.status(200).json(results);
  });
});

// Add property route
app.post('/api/add-property', (req, res) => {
  const { address, price, age, furnished_status } = req.body;

  if (!address || !price || !age || !furnished_status) {
    return res.status(400).json({ error: 'All fields must be filled out' });
  }

  // Insert property into the property table
  db.query(
    'INSERT INTO property (address, price, age, furnished_status) VALUES (?, ?, ?, ?)',
    [address, parseInt(price), parseInt(age), furnished_status],
    (err, result) => {
      if (err) {
        console.error('Error inserting property:', err.message);
        return res.status(500).json({ error: 'Failed to insert property' });
      }

      // Get the inserted property_id
      const propertyId = result.insertId;

      // Confirm insertion and send property_id in the response
      console.log('Inserted property with ID:', propertyId);
      res.status(201).json({ message: 'Property added successfully', propertyId });
    }
  );
});


// Add Review Route
app.post('/api/add-review', (req, res) => {
  const { review_text, rating, reviewer_id, property_id } = req.body;

  if (!review_text || !rating || !reviewer_id || !property_id) {
    return res.status(400).json({ error: 'All fields must be filled out' });
  }

  // Check if the property_id exists
  db.query('SELECT 1 FROM property WHERE property_id = ?', [property_id], (err, result) => {
    if (err) {
      console.error('Error validating property:', err.message);
      return res.status(500).json({ error: 'Failed to validate property' });
    }

    if (result.length === 0) {
      return res.status(400).json({ error: 'Invalid property_id, no such property exists' });
    }

    // Now insert the review into the review table
    db.query(
      'INSERT INTO review (text_review, rating, reviewer_id, property_id) VALUES (?, ?, ?, ?)',
      [review_text, parseInt(rating), parseInt(reviewer_id), parseInt(property_id)],
      (err, reviewResult) => {
        if (err) {
          console.error('Error inserting review:', err.message);
          return res.status(500).json({ error: 'Failed to add review' });
        }

        res.status(201).json({
          message: 'Review added successfully',
          reviewId: reviewResult.insertId,
        });
      }
    );
  });
});

const jwt = require('jsonwebtoken');

app.post('/api/add-review', (req, res) => {
  const { review_text, rating, reviewer_id, property_id } = req.body;

  // Check for the Authorization header
  const token = req.headers['authorization']?.split(' ')[1]; // Extract Bearer token

  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }

    // Proceed with review submission if token is valid
    if (!review_text || !rating || !reviewer_id || !property_id) {
      return res.status(400).json({ error: 'All fields must be filled out' });
    }

    // Check if the property_id exists in the database
    db.query('SELECT 1 FROM property WHERE property_id = ?', [property_id], (err, result) => {
      if (err) {
        console.error('Error validating property:', err.message);
        return res.status(500).json({ error: 'Failed to validate property' });
      }

      if (result.length === 0) {
        return res.status(400).json({ error: 'Invalid property_id, no such property exists' });
      }

      // Insert the review into the review table
      db.query(
        'INSERT INTO review (text_review, rating, reviewer_id, property_id) VALUES (?, ?, ?, ?)',
        [review_text, parseInt(rating), parseInt(reviewer_id), parseInt(property_id)],
        (err, reviewResult) => {
          if (err) {
            console.error('Error inserting review:', err.message);
            return res.status(500).json({ error: 'Failed to add review' });
          }

          res.status(201).json({
            message: 'Review added successfully',
            reviewId: reviewResult.insertId,
          });
        }
      );
    });
  });
});


// Error handling for server startup
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


require('dotenv').config();
const bcrypt = require('bcryptjs');
const mysql = require('mysql2');

// Set up MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'Real_Estate',
});

db.connect((err) => {
  if (err) {
    console.error('DB connection failed:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Function to hash and update passwords
const hashPasswords = async () => {
  // Fetch all users
  const [rows] = await db.promise().query('SELECT user_id, password FROM user');

  // Iterate over each user and hash their password
  for (const user of rows) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    // Update the password in the database with the hashed version
    await db.promise().query('UPDATE user SET password = ? WHERE user_id = ?', [hashedPassword, user.user_id]);
    console.log(`Password for user_id ${user.user_id} updated.`);
  }
  console.log('All passwords have been hashed and updated in the database.');
  db.end(); // Close the connection
};

// Execute the function to hash passwords
hashPasswords();

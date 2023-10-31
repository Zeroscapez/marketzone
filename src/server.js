const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3001;

// Create a MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: 'password', // Replace with your MySQL password
  database: 'myDB', // Replace with your database name
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});


app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

// Serve the React frontend from the 'src' directory
app.use(express.static(path.join(__dirname, '../src')));

app.get('/', (req, res) => {
    res.send('Welcome to My App'); // You can customize this message
  });

// Define a catch-all route to serve the main HTML file
app.get('/marketzone/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

// Create an endpoint for user registration
app.post('/marketzone/api/register', (req, res) => {
  // ... (registration logic)

  // Get the registration data from the request body
  const userData = req.body;

  // Implement the logic to insert the user registration data into your MySQL database
  const { first_name, last_name, email, username, password } = userData;
  
  // Sample SQL query to insert data into a 'users' table
  const sql = `INSERT INTO users (first_name, last_name, email, username, password) VALUES (?, ?, ?, ?, ?)`;
  
  db.query(sql, [first_name, last_name, email, username, password], (error, results) => {
    if (error) {
      console.error('Database error:', error);
      res.json({ success: false, message: 'Registration failed' });
    } else {
      console.log('User registered:', results);
      res.json({ success: true, message: 'Registration successful' });
    }
  });

  // Enable CORS for this specific route
  res.header('Access-Control-Allow-Origin', '*');

  // ... (response logic)
});

// Create an endpoint for user login
app.post('/marketzone/api/login', (req, res) => {
  // Get the login data from the request body
  const loginData = req.body;

  // Implement the logic to verify the user's credentials
  const { username, password } = loginData;

  // Sample SQL query to check if the user with the provided credentials exists in the 'users' table
  const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;

  db.query(sql, [username, password], (error, results) => {
    if (error) {
      console.error('Database error:', error);
      res.json({ success: false, message: 'Login failed' });
    } else {
      if (results.length === 0) {
        res.json({ success: false, message: 'Invalid username or password' });
      } else {
        // User is authenticated; you can create a session or issue a token here
        res.json({ success: true, message: 'Login successful' });
      }
    }
  });

  // Enable CORS for this specific route
  res.header('Access-Control-Allow-Origin', '*');
});

// ... (other routes and logic)

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

require('dotenv').config({ path: '../../.env' }); // Replace 'path_to_securitytoken.env' with the actual file path
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const secretKey = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');
const authenticateToken = require('./authMiddleware');


const app = express();
const port = 3001;


// Create a MySQL database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
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



app.post('/marketzone/api/login', (req, res) => {
  const loginData = req.body;
  const { username, password } = loginData;

  // Implement the logic to verify the user's credentials
  const sql = `SELECT id, username FROM users WHERE username = ? AND password = ?`; // Include 'id' in the query

  db.query(sql, [username, password], (error, results) => {
    if (error) {
      console.error('Database error:', error);
      res.json({ success: false, message: 'Login failed' });
    } else {
      if (results.length === 0) {
        res.json({ success: false, message: 'Invalid username or password' });
      } else {
        // User is authenticated; generate a JWT token
        const user = { id: results[0].id, username: username }; // Include 'id' in the payload
        const token = jwt.sign(user, secretKey, { expiresIn: '1h' });

        // Send the token in the response
        res.json({ success: true, token });
      }
    }
  });
});



app.get('/marketzone/api/userData', authenticateToken, (req, res) => {
  const userId = req.user.id;
  console.log(req.user.id);
  // Query user data from your database based on the userId
  const sql = `SELECT username FROM users WHERE id = ?`;

  db.query(sql, [userId], (error, results) => {
    if (error) {
      console.error('Database error:', error);
      res.json({ success: false, message: 'Failed to retrieve user data' });
    } else {
      if (results.length === 0) {
        res.json({ success: false, message: 'User not found' });
      } else {
        res.json({ success: true, data: results[0] });
      }
    }
  });
});

// Add a new API endpoint for fetching user account details
app.get('/marketzone/api/accountDetails', authenticateToken, (req, res) => {
  const userId = req.user.id;

  // Query user account details from your database based on the userId
  const sql = `SELECT first_name, last_name, username FROM users WHERE id = ?`;

  db.query(sql, [userId], (error, results) => {
    if (error) {
      console.error('Database error:', error);
      res.json({ success: false, message: 'Failed to retrieve account details' });
    } else {
      if (results.length === 0) {
        res.json({ success: false, message: 'User not found' });
      } else {
        res.json({ success: true, data: results[0] });
      }
    }
  });
});

// Add a new API endpoint for password reset
app.post('/marketzone/api/resetPassword', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const newPassword = req.body.newPassword;

  // Implement the logic to reset the user's password in your database
  const sql = `UPDATE users SET password = ? WHERE id = ?`;

  db.query(sql, [newPassword, userId], (error, results) => {
    if (error) {
      console.error('Database error:', error);
      res.json({ success: false, message: 'Password reset failed' });
    } else {
      res.json({ success: true, message: 'Password reset successful' });
    }
  });
});

// Add a new API endpoint for listing products
app.post('/marketzone/api/listProducts', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const { image, name, description, price } = req.body;

  // Implement the logic to insert the product listing into your MySQL database
  const sql = `INSERT INTO products (user_id, image, name, description, price) VALUES (?, ?, ?, ?, ?)`;

  db.query(sql, [userId, image, name, description, price], (error, results) => {
    if (error) {
      console.error('Database error:', error);
      res.json({ success: false, message: 'Product listing failed' });
    } else {
      console.log('Product listed:', results);
      res.json({ success: true, message: 'Product listed successfully' });
    }
  });
});

// Add an API endpoint to fetch the user's product listings
app.get('/marketzone/api/userProducts', authenticateToken, (req, res) => {
  const userId = req.user.id;

  // Implement the logic to fetch the user's product listings from your database
  const sql = `SELECT id, image, name, description, price FROM products WHERE user_id = ?`;

  db.query(sql, [userId], (error, results) => {
    if (error) {
      console.error('Database error:', error);
      res.json({ success: false, message: 'Failed to retrieve product listings' });
    } else {
      res.json({ success: true, data: results });
    }
  });
});

app.get('/marketzone/api/products', (req, res) => {
  // Query all products with user information
  const sql = `
    SELECT p.id, p.image, p.name, p.description, p.price, u.username
    FROM products p
    INNER JOIN users u ON p.user_id = u.id
  `;

  db.query(sql, (error, results) => {
    if (error) {
      console.error('Database error:', error);
      res.json({ success: false, message: 'Failed to retrieve products' });
    } else {
      res.json({ success: true, data: results });
    }
  });
});

// Add a new API endpoint for fetching the user's cart items
app.get('/marketzone/api/cart', authenticateToken, (req, res) => {
  const userId = req.user.id;

  // Implement the logic to fetch the user's cart items from your database
  const sql = `
  SELECT c.product_id, p.image, p.name, p.price, c.quantity
  FROM cart c
  INNER JOIN products p ON c.product_id = p.id
  WHERE c.user_id = ?
`;


  db.query(sql, [userId], (error, results) => {
    if (error) {
      console.error('Database error:', error);
      res.json({ success: false, message: 'Failed to retrieve cart items' });
    } else {
      res.json({ success: true, data: results });
    }
  });
});

app.post('/marketzone/api/addToCart', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const product = req.body.product;

  // Implement the logic to insert the product into the user's cart in your MySQL database
  // You will need to adjust this SQL query based on your database schema.
  const sql = `
  INSERT INTO cart (user_id, product_id, quantity)
  VALUES (?, ?, 1) 
  ON DUPLICATE KEY UPDATE quantity = quantity + 1
`;


  db.query(sql, [userId, product.id], (error, results) => {
    if (error) {
      console.error('Database error:', error);
      res.status(500).json({ success: false, message: 'Failed to add product to cart' });
    } else {
      console.log('Product added to cart:', results);
      res.json({ success: true, message: 'Product added to cart successfully' });
    }
  });
});

app.delete('/marketzone/api/cart/:productId', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const productId = req.params.productId;

  // Implement the logic to delete the item from the user's cart in your database using productId.
  // You will need to adjust this SQL query based on your database schema.
  const sql = 'DELETE FROM cart WHERE user_id = ? AND product_id = ?';

  db.query(sql, [userId, productId], (error, results) => {
    if (error) {
      console.error('Database error:', error);
      res.status(500).json({ success: false, message: 'Failed to delete item from cart' });
    } else {
      console.log('Item deleted from cart:', results);
      res.json({ success: true, message: 'Item deleted from cart successfully' });
    }
  });
});





// Define a catch-all route to serve the main HTML file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


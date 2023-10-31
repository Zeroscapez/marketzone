import React, { useState } from 'react';
import './websitecolors.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import the cookie library

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    console.log('Username:', username);
    console.log('Password:', password);

    try {
      const response = await axios.post('http://localhost:3001/marketzone/api/login', {
        username,
        password,
      });

      if (response.data.success) {
        alert('Login successful!');
        
        // Set a cookie to remember the login status
        Cookies.set('isLoggedIn', 'true', { expires: 7 }); // Expires in 7 days

        navigate('/');
      } else {
        alert('Login failed. Please check your credentials.');
      }

      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <div className="header">
        <h2 style={{ marginBottom: "30px" }}>Website</h2>
      </div>
      <div className="loginsection">
        <h2>
          Hello, Sign in or <Link to="/marketzone_registration">create an account</Link>
        </h2>
        <form action="" method="post" onSubmit={handleFormSubmit}>
          <div className="forminfo">
            <label htmlFor="username" className="floating-label floating_label--animate floating_label--inline">Username</label>
            <div className="floating-label">
              <input type="text" id="username" maxLength="64" required value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
          </div>
          <div className="forminfo" style={{ marginBottom: '40px' }}>
            <label htmlFor="password" className="floating-label floating_label--animate floating_label--inline">Password</label>
            <input type="password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button id="signin-continue" name="signin-continue" type="submit">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;

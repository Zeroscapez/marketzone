import React, { Component } from 'react';
import './websitecolors.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleFormSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    console.log('Username:', username);
    console.log('Password:', password);
  
    try {
      // Make an HTTP POST request to the server's login endpoint
      const response = await axios.post('/api/login', {
        username,
        password,
      });

      // Handle the response
      if (response.data.success) {
        alert('Login successful!');
      } else {
        alert('Login failed. Please check your credentials.');
      }

      // Reset the form after submission
      this.setState({
        username: '',
        password: '',
      });
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div>
        <div className="header">
          <h2 style={{ marginBottom: "30px" }}>Website</h2>
        </div>
        <div className="loginsection">
          <h2>
            Hello, Sign in or <Link to="/registration">create an account</Link>
          </h2>
          <form action="" method="post" onSubmit={this.handleFormSubmit}>
            <div className="forminfo">
              <label htmlFor="username" className="floating-label floating_label--animate floating_label--inline">Username</label>
              <div className="floating-label">
                <input type="text" id="username" name="username" maxLength="64" required value={this.state.username} onChange={this.handleInputChange} />
              </div>
            </div>
            <div className="forminfo" style={{ marginBottom: '40px' }}>
              <label htmlFor="password" className="floating-label floating_label--animate floating_label--inline">Password</label>
              <input type="password" id="password" name="password" required value={this.state.password} onChange={this.handleInputChange} />
            </div>
            <button id="signin-continue" name="signin-continue" type="submit">
              Log In
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginPage;

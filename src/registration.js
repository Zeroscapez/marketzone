import React, { Component } from 'react';
import axios from 'axios';

class RegistrationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      username: '',
      password: '',
    };
  }

  handleFormSubmit = async (e) => {
    e.preventDefault();
    const { first_name, last_name, email, username, password } = this.state;
    
    // You can add registration logic here, for example, making an HTTP request to your backend API
    // Send this data to your backend for user registration
    console.log('Registration Data:');
    console.log('First Name:', first_name);
    console.log('Last Name:', last_name);
    console.log('Email:', email);
    console.log('Username:', username);
    console.log('Password:', password);

    try {
      const response = await axios.post('/api/register', {
        first_name,
        last_name,
        email,
        username,
        password,
      });

      if (response.data.success) {
        alert('Registration successful!');
      } else {
        alert('Registration failed. Please try again.');
      }

    // Reset the form after submission
    this.setState({
      first_name: '',
      last_name: '',
      email: '',
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
          <h2>Website</h2>
        </div>
        <div className="loginsection">
          <h2>Hello, Sign up now</h2>
          <form method="post" onSubmit={this.handleFormSubmit}>
            <div className="forminfo">
              <label htmlFor="first_name" className="floating-label floating_label--animate floating_label--inline">First Name:</label>
              <input type="text" name="first_name" id="first_name" required value={this.state.first_name} onChange={this.handleInputChange} />
            </div>
            <div className="forminfo">
              <label htmlFor="last_name" className="floating-label floating_label--animate floating_label--inline">Last Name:</label>
              <input type="text" name="last_name" id="last_name" required value={this.state.last_name} onChange={this.handleInputChange} />
            </div>
            <div className="forminfo">
              <label htmlFor="email" className="floating-label floating_label--animate floating_label--inline">Email:</label>
              <input type="email" name="email" id="email" required value={this.state.email} onChange={this.handleInputChange} />
            </div>
            <div className="forminfo">
              <label htmlFor="username" className="floating-label floating_label--animate floating_label--inline">Username:</label>
              <input type="text" name="username" id="username" required value={this.state.username} onChange={this.handleInputChange} />
            </div>
            <div className="forminfo">
              <label htmlFor="password" className="floating-label floating_label--animate floating_label--inline">Password:</label>
              <input type="password" name="password" id="password" required value={this.state.password} onChange={this.handleInputChange} />
            </div>
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    );
  }
}

export default RegistrationPage;

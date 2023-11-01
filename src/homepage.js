import React, { Component } from 'react';
import Product from './components/Product';
import accimg from './img/assets/account-25.svg';
import ProductList from './components/ProductList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAccountDropdownOpen: false,
      error: null,
    };
  }

  // Function to toggle the account dropdown
  toggleAccountDropdown = () => {
    this.setState({ isAccountDropdownOpen: !this.state.isAccountDropdownOpen });
  }

  handleLogout = () => {
    try {
      // Clear user session data
      localStorage.removeItem('token'); // Remove the user token
      localStorage.removeItem('userName'); // Remove user name

      // Update the state in the parent component to reflect the user is logged out
      this.props.setLoggedInUser(null);
      this.props.setIsLoggedIn(false);

      // Redirect the user to the login page or any other desired page
      window.location.href = '/marketzone_login';
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    const { isLoggedIn, loggedInUser } = this.props;
    const { error } = this.state;

    return (
      <div>
        <header className="navbar">
          <h1>Welcome to Our Store</h1>
          <div className="account-dropdown">
            <button className="account-button" onClick={this.toggleAccountDropdown}>
              {isLoggedIn ? `My Account (${loggedInUser})` : 'My Account'}
              <img src={accimg} alt="acc" />
            </button>
            {this.state.isAccountDropdownOpen && (
              <div className="account-dropdown-content">
                {isLoggedIn ? (
                  <a href="/account_details">Account Details</a>
                ) : (
                  <a href="/marketzone_login">Log In</a>
                )}
                {isLoggedIn && (
                  <a href="/" onClick={this.handleLogout}>
                    Log Out
                  </a>
                )}
              </div>
            )}
          </div>
        </header>

        <ProductList />

        {error && <div className="error">{error.message}</div>}
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import Product from './components/Product';
//import AccountPage from './components/AccountPage'; // Import the AccountPage component
import accimg from './img/assets/account-25.svg'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAccountDropdownOpen: false,
    };
  }

  toggleAccountDropdown = () => {
    this.setState({ isAccountDropdownOpen: !this.state.isAccountDropdownOpen });
  }

  render() {
    return (
      <div>
        <header className="navbar">
          <h1>Welcome to Our Store</h1>
          <div className="account-dropdown">
            <button className="account-button" onClick={this.toggleAccountDropdown}>
              My Account <img src={accimg} alt="acc" />
            </button>
            {this.state.isAccountDropdownOpen && (
              <div className="account-dropdown-content">
                <a href="/account_details">Account Details</a>
                <a href="/log_out">Log Out</a>
              </div>
            )}
          </div>
        </header>

        <Product />
        <Product />
      </div>
    );
  }
}

export default App;

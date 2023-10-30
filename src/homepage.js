import React from 'react';
import Product from './components/Product';
//import AccountPage from './components/AccountPage'; // Import the AccountPage component
import accimg from './img/assets/account-25.svg'

class App extends React.Component {
  render() {
    return (
      <div>
        <header className="navbar">
          <h1>Welcome to Our Store</h1>
          <div className="account-link">
            <a href="/marketzone/registration">My Account <img src={accimg} alt="acc" /></a> {/* Link to the AccountPage */}
          </div>
        </header>

        <Product />
        <Product />
      </div>
    );
  }
}

export default App;


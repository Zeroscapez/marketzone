import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './loginpage';
import RegistrationPage from './registration';
import HomePage from './homepage';
import Cookies from 'js-cookie';
import Accounts from './components/accounts';
import CartPage from './cartpage';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in (you can use your cookie or token logic here)
    const userToken = localStorage.getItem('token');
    const userName = Cookies.get('userName');

    if (userToken && userName) {
      setLoggedInUser(userName);
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/marketzone_login"
            element={<LoginPage setLoggedInUser={setLoggedInUser} setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/marketzone_registration" element={<RegistrationPage />}/>
          <Route path="/marketzone_cart" element={<CartPage />}/>

          <Route
            path="/"
            element={<HomePage loggedInUser={loggedInUser} isLoggedIn={isLoggedIn} />}
          />

          <Route path="/account_details" element={<Accounts />} />

          


        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from './loginpage';
import RegistrationPage from './registration'; 
import HomePage from './homepage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/marketzone_login" element={<LoginPage />} />
          <Route path="/marketzone_registration" element={<RegistrationPage />} />
          <Route path="/" element={<HomePage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

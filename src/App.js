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
          <Route path="/marketzone/login" element={<LoginPage />} />
          <Route path="/marketzone/registration" element={<RegistrationPage />} />
          <Route path="/marketzone" element={<HomePage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

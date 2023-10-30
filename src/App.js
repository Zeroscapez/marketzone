import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from './loginpage'; // Corrected filename
import RegistrationPage from './registration'; // Corrected filename

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/marketzone" element={<LoginPage />} />
          <Route path="/marketzone/registration" element={<RegistrationPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

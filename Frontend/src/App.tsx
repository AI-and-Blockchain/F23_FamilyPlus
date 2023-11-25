import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import Header from './components/Header';

import Homepage from './pages/HomePage';
import SignUpLogin from './pages/SignupLogin';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Header />

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup-login" element={<SignUpLogin />} />
          <Route path="/contactUs" element={<ContactUs />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;

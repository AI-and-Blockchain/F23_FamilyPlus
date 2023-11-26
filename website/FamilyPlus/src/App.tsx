import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Homepage from './pages/homepage';
import ContactUsPage from './pages/contactUsPage';
import ConnectPage from './pages/connectPage';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/connect" element={<ConnectPage />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;

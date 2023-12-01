import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Homepage from './pages/homepage';
import ContactUsPage from './pages/contactUsPage';
import ConnectPage from './pages/connectPage';
import PortalPage from './pages/portalPage';
import ViewDocumentPage from './pages/viewDocPage';
import UploadDocPage from './pages/uploadDocPage';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/connect" element={<ConnectPage />} />
          <Route path="//health-portal" element={<PortalPage />} />
          <Route path="/view-documents" element={<ViewDocumentPage />} />
          <Route path="/upload-documents" element={<UploadDocPage />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;

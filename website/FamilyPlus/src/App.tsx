import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/homepage';
import ContactUsPage from './pages/contactUsPage';
import ConnectPage from './pages/connectPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/connect" element={<ConnectPage />} />
      </Routes>
    </Router>
  );
}

export default App;

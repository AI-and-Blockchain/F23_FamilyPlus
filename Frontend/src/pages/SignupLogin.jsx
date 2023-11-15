// src/pages/LSPage.jsx
import React from 'react';
import Login from '../components/Login';
import Signup from '../components/SignUp';

const SignupLogin = () => {
  // Callback function to handle login
  const handleLogin = (userData) => {
    console.log('Login successful:', userData);
    // Add any additional logic for successful login, such as redirecting to another page
  };

  // Callback function to handle signup
  const handleSignup = (userData) => {
    console.log('Signup successful:', userData);
    // Add any additional logic for successful signup, such as redirecting to another page
  };

  return (
    <div>
      <h1>Login and Signup Page</h1>
      {/* Render the Login component with the login callback */}
      <Login onLogin={handleLogin} />
      {/* Render the Signup component with the signup callback */}
      <Signup onSignup={handleSignup} />
    </div>
  );
};

export default SignupLogin;

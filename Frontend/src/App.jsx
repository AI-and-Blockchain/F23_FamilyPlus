// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignupLogin from './pages/SignupLogin';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/ls">
          {/* Render the LSPage component */}
          <SignupLogin />
        </Route>
        {/* Add more routes as needed */}
      </Switch>
    </Router>
  );
};

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import User from './pages/User/User';

import logo from './logo.svg';
import './App.css';

const App = () => (
  <Router>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <p className="App-intro">
        To get started, edit
        <code>src/App.js</code>
        and save to reload.
      </p>
      <Link to="/user">toUser</Link>
      <Route exact path="/user" component={User} />
    </div>
  </Router>
);

export default App;

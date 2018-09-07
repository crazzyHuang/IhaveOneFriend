import React from 'react';
import { Route, Link } from 'react-router-dom';
import User from './pages/User/User';

import logo from './logo.svg';
import styles from './App.less';

const App = () => (
  <div className={styles.App}>
    <header className={styles['App-header']}>
      <img src={logo} className={styles['App-logo']} alt="logo" />
      <h1 className={styles['App-title']}>Welme</h1>
    </header>
    <p className={styles['App-intro']}>
      To get started, edit
      <code>src/App.js</code>
      and save to reload.
    </p>
    <Link to="/user">toUser</Link>
    <Route exact path="/user" component={User} />
  </div>
);

export default App;

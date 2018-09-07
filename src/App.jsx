import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Link } from 'react-router-dom';
import configureStore, { history } from './store/configureStore';

import User from './pages/User/User';

import logo from './logo.svg';
import styles from './App.less';

const store = configureStore({ name: 'david' });

const App = () => (
  <Provider store={store} key={Math.random()}>
    <ConnectedRouter history={history}>
      <div className={styles.App}>
        <header className={styles['App-header']}>
          <img src={logo} className={styles['App-logo']} alt="logo" />
          <h1 className={styles['App-title']}>wwwwwe2222222eeeee3me33332222</h1>
        </header>
        <p className={styles['App-intro']}>
          To get started, edit
          <code>src/App.js</code>
          and save to reload.
        </p>
        <Link to="/user">toUser</Link>
        <Route exact path="/user" component={User} />
      </div>
    </ConnectedRouter>
  </Provider>
);

export default App;

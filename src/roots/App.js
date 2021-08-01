import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import storeConfig from '../helpers/store-config';
import history from '../helpers/history';
import Routes from './routes';

const store = storeConfig();

export default function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Routes />
      </Router>
    </Provider>
  );
}
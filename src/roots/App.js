import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { clearAlert } from '../actions/app';
import { AlertView } from '../components';
import { Provider } from 'react-redux';
import storeConfig from '../helpers/store-config';
import history from '../helpers/history';
import Routes from './routes';

const store = storeConfig();
let prevDataAlert = null
let timeoutDataAlert = null;

export default function App(props) {
  const [objAlert, setObjAlert] = useState(null);

  useEffect(() => {
    store.subscribe(_listenAlert)
  }, [])

  const _listenAlert = () => {
    const { dataAlert } = store.getState().app;
    if (dataAlert != prevDataAlert) {
      prevDataAlert = dataAlert;
      setObjAlert(dataAlert);
      clearTimeout(timeoutDataAlert)
      timeoutDataAlert = setTimeout(() => {
        store.dispatch(clearAlert())
      }, 5000);
    }
  }

  return (
    <Provider store={store}>
      <BrowserRouter history={history}>
        <Routes />
      </BrowserRouter>
      {objAlert && <AlertView message={objAlert.message} type={objAlert.type} />}
    </Provider>
  );
}
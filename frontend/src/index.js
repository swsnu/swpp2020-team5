import * as serviceWorker from './serviceWorker';
import store, { history } from './store/store'
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';
import { createStore } from 'redux';
import userReducer from './store/reducers/userReducer/userReducer.js';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import App from './App';
import './index.css';

const options = {
  // you can also just use 'bottom center'
  position: positions.CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE,
  type: 'success'
}

const rootReducer = userReducer;

ReactDOM.render(
  <AlertProvider template={AlertTemplate} {...options}>
    <Provider store = {store}>
      <App history = {history} />
    </Provider>
  </AlertProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

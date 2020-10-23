import * as serviceWorker from './serviceWorker';
import store, { history } from './store/store'
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';

import App from './App';
import './index.css';

ReactDOM.render(
    <Provider store = {store}>
      <App history = {history} />
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
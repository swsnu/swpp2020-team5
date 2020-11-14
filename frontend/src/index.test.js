import React from 'react';
import store, { history } from './store/store';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import App from './App';

jest.mock('react-dom', () => ({ render: jest.fn() }));

test('render with App and root div', () => {
  const root = document.createElement('div');
  root.id = 'root';
  document.body.appendChild(root);

  require('./index.js');
  
  const options = {
  // you can also just use 'bottom center'
  position: positions.CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE,
  type: 'success',
  };


  expect(ReactDOM.render).toHaveBeenCalledWith(
    <AlertProvider template={AlertTemplate} {...options}>
      <Provider store={store}>
        <App history={history}/>
      </Provider>
    </AlertProvider>, root);
})

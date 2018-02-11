import React, {Component} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store';
import App from './routes';

const store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept();
}

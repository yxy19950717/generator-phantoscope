import React, {Component} from 'react';
import {render} from 'react-dom';
import {Provider} from 'mobx-react';
import store from './store';
import App from './routes';

render(
  <Provider {...store}>
    <App />
  </Provider>, 
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept();
}

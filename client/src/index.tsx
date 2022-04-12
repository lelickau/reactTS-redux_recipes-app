import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';
import './firebase-config';
import App from './App';
import ScrollToTop from 'helpers/ScrollToTop';

ReactDOM.render(
  <Provider  store={store}>
    <BrowserRouter>
      <ScrollToTop/>
      <App />
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root')
);


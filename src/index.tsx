import React from 'react';
import ReactDOM from 'react-dom';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { Actions, RootState } from './types/state';
import reducers from './reducers';
import { authTokenName } from './constants';

import App from './components/app';
import './style.scss';

// this creates the store with the reducers, and does some other stuff to initialize devtools
// boilerplate to copy, don't have to know
const store = createStore(reducers, {}, composeWithDevTools(
  applyMiddleware(thunk as ThunkMiddleware<RootState, Actions>),
));

// Check if auth token is present in browser
const getTokenFromLocalStorage = () => {
  return new Promise((resolve) => {
    resolve(localStorage.getItem(authTokenName));
  });
};

getTokenFromLocalStorage().then((authToken) => {
  if (authToken) { // User has previous authentication token
    store.dispatch({ type: 'AUTH_USER', status: 'SUCCESS', payload: {} });
  } else { // No authorization
    store.dispatch({ type: 'DEAUTH_USER', status: 'SUCCESS' });
  }
}).catch((error) => {
  console.error(error);
});

// we now wrap App in a Provider
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('main'),
);

import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';

// import { authTokenName } from './constants';

import App from './components/app';

import reducers from './store/reducers';
import rootSaga from './store/sagas';

import { Actions } from './types/state';

import './style.scss';

const sagaMiddleware = createSagaMiddleware();

// this creates the store with the reducers, and does some other stuff to initialize devtools
// boilerplate to copy, don't have to know
const store = createStore(reducers, {}, composeWithDevTools(
  applyMiddleware(sagaMiddleware),
));

sagaMiddleware.run(rootSaga);

store.dispatch<Actions>({ type: 'INITIALIZE_SOCKET', status: 'SUCCESS', payload: { url: 'http://localhost:9090' } });
store.dispatch<Actions>({ type: 'MAKE_MOVE', status: 'REQUEST', payload: { boardState: 'aasdfkjasdfjhoauisdhfuoahsdf', gameId: 'asdf8fghsd' } });

// // Check if auth token is present in browser
// const getTokenFromLocalStorage = () => {
//   return new Promise((resolve) => {
//     resolve(localStorage.getItem(authTokenName));
//   });
// };

// getTokenFromLocalStorage().then((authToken) => {
//   if (authToken) { // User has previous authentication token
//     store.dispatch({ type: 'AUTH_USER', status: 'SUCCESS', payload: {} });
//   } else { // No authorization
//     store.dispatch({ type: 'DEAUTH_USER', status: 'SUCCESS' });
//   }
// }).catch((error) => {
//   console.error(error);
// });

// we now wrap App in a Provider
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('main'),
);

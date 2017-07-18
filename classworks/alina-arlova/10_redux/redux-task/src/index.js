import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import App from './App.js';
import store from './store.js';

// function reducer(state = [], action) {
//   switch (action.type) {
//     case 'fetchIssues':
//       return action.payload;
//   };
// }

// let store = createStore(reducer, compose(
//     applyMiddleware(thunkMiddleware),
//     window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : noop => noop,
//   ),
// );

ReactDOM.render((
  <Provider store = {store}>
    <App />
  </Provider>
),
  document.getElementById('root')
);

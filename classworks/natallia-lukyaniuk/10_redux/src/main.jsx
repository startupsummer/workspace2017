import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import createHashHistory from 'history/createHashHistory';
import { Route } from 'react-router-dom';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

import reducer from './reducers';
import App from './pages/App/App';
import './main.css';


const history = createHashHistory();
const store = createStore(reducer, {}, composeWithDevTools(
  applyMiddleware(thunk, routerMiddleware(history)),
));

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
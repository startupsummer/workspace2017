import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store.js';


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path='/' component={App}>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();

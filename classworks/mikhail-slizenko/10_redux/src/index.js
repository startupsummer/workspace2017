import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from 'store';

import Issues from 'pages/issues/issues';
import 'pages/issues/issues.css';

ReactDOM.render(
  <Provider store={ store }>
    <Issues />
  </Provider>,
  document.getElementById('root')
);

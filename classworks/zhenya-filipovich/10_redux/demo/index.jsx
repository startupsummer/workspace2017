import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Board from './pages/Board';
import store from '';


ReactDOM.render((
  <Provider store={store}>
    <Board />
  </Provider>
),
  document.getElementById('root')
);

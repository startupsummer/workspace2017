import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App.js'


ReactDOM.render(
  <Router>  
    <App />
  </Router>,
  document.querySelector('#root')
);

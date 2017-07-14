import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import App from "./App";
import List from "./List";
import './main.css';



ReactDOM.render((
  <Router>
    <App />
  </Router>
  ),
  document.getElementById('root')
);

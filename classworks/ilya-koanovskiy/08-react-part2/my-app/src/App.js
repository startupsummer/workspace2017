import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Issues from './components/issues/index.js';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


class App extends Component {
  render() {
    return (
        <Router> 
          <Issues/>
        </Router>
    );
  }
}

export default App;

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Issues from './components/issues/index.js';


class App extends Component {
  render() {
    return (
      <div>
        <Issues/>
      </div>
    );
  }
}

export default App;

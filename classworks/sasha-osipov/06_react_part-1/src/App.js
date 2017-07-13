import React, { Component } from 'react';
import Header from './Header/Header';
import Main from './Main/Main';
import './index.css';

class App extends Component {
  render() {
    return (
      <div className = "main-container">
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;

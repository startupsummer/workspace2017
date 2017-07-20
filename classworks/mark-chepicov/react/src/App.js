import React, { Component } from 'react';
import './main.css';
import Header from './Components/header.js';
import Main from './Components/main.js';

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Main />
      </div>

      /*
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>*/
    );
  }
}

export default App;
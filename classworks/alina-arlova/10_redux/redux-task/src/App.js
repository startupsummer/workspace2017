import React, { Component } from 'react';

import Header from './components/Headers/header.js';
import Body from './components/Body.js'
import './main.css';

class App extends React.Component {
  render() {
    return (
      <div>
          <Header />
          <Body />
      </div>
    );
  }
}

export default App;

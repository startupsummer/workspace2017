import React, { Component } from 'react';

import Header from './components/header/index';
import Main from './components/main/index';

import data from './data';

class App extends Component {
  constructor() {
    super();
    this.state = {
      issues: data,
    };
  }
  render() {
    console.log(this.state.issuesLength)
    return (
      <div>
        <Header />
        <Main issues={this.state.issues}/>
      </div>
    );
  }
}

export default App;

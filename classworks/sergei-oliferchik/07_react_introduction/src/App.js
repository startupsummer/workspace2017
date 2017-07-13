import React, { Component } from 'react';

import Header from './components/header/index';
import Main from './components/main/index';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;

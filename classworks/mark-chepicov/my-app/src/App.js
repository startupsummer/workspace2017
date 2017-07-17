import React, { Component } from 'react';
import './main.css';
import Header from './Components/header/header.js';
import Main from './Components/main/main.js';
import { BrowserRouter as Router} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header/>
          <Main />
        </div>
      </Router>
    );
  }
}

export default App;
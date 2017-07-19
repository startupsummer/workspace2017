import React, { Component } from 'react';
import './App.css';
import Issues from './components/issues/index.js';
import { BrowserRouter as Router} from 'react-router-dom';


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

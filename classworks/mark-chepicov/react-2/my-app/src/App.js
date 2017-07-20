import React, { PureComponent } from 'react';
import './main.css';
import { BrowserRouter as Router} from 'react-router-dom';
import AppBody from './Components/app/app-body.js';

class App extends PureComponent {
  render() {
    return (
      <Router>
        <AppBody />
      </Router>
    );
  }
}

export default App;
import React, { Component } from 'react';

import AppHeader from './components/AppHeader';
import IssuesListening from './components/IssuesListening';
import Pagehead from './components/Pagehead';
import './main.css';

class App extends Component {
  render() {
    return (
      <div>
        <AppHeader />
        <main className="content">
          <Pagehead />
          <div className="container">
            <IssuesListening />
          </div>
        </main>
      </div>
    );
  }
}

export default App;

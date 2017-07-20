import React, { PureComponent } from 'react';

import AppHeader from './components/AppHeader';
import IssuesListening from './components/IssuesListening';
import Pagehead from './components/Pagehead';
import './main.css';

class App extends PureComponent {
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

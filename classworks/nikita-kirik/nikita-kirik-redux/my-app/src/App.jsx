import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import AppHeader from './components/AppHeader';
import IssuesList from './components/IssuesList';
import Pagehead from './components/Pagehead';
import IssueDiscription from './components/IssueDiscription';
import './main.css';

class App extends Component {
  render() {
    return (
      <div>
        <AppHeader />
        <main className="content">
          <Pagehead />
          <div className="container">
            <Route exact path="/" component={IssuesList} />
            <Route path="/discription/:id" component={IssueDiscription} />

          </div>
        </main>
      </div>
    );
  }
}

export default App;

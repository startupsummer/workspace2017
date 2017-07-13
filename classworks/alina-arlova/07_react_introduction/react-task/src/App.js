import React, { Component } from 'react';
import Header from './header.js';
import IssuesListing from './issues-listing.js';
import logo from './logo.svg';
import './App.css';
import './main.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header/>
        <IssuesListing/>
      </div>
    );
  }
}

export default App;

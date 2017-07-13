import React, { Component } from 'react';
import Issues from './issues.js';
import logo from './logo.svg';
import './App.css';
import './main.css';

class IssuesListing extends Component {
  render() {
    return (
      <div className='issues-listing'>
        <Issues/>
      </div>
    );
  }
}

export default IssuesListing;

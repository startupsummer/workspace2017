import React, { Component } from 'react';
import IssuesItem from './issues-item.js';
import logo from './logo.svg';
import './App.css';
import './main.css';

class Issues extends Component {
  render() {
    return (
      <ul className='issues'>
        <IssuesItem/>
        <IssuesItem/>
      </ul>
    );
  }
}

export default Issues;

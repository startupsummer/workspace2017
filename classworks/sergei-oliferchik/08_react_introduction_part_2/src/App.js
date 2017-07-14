import React, { Component } from 'react';

import Header from './components/header/index';
import Main from './components/main/index';

import data from './data';
import addData from './addData';



class App extends Component {
  constructor() {
    super();
    this.state = {
      issues: data,
      issuesState: 'open',
      searchField: '',
    };
  }

chengedIssues = (id) => () => {
  let newState = this.state.issues.map(el => {
    const issuesState = this.state.issuesState;
    console.log(issuesState)
    if(el.id === id) {
      return Object.assign({}, el, {
        state: issuesState === 'open'
          ? 'closed'
          : 'open'
      });
    }
    return el;
  });
  this.setState({ issues: newState });
}

addIssues = () => () => {
  if(addData.length) {
    const issues = this.state.issues;
    const newData = addData.pop();
    const newState  = [...issues,newData];

    this.setState({ issues: newState });
  }
}

stateOpen = () => {
  this.setState({ issuesState: 'open' });
}

event = () => (
  this.state.issuesState === 'open'
    ? this.stateOpen
    : this.stateClosed
)
stateClosed = () => {
  this.setState({ issuesState: 'closed' });
}

search = (e) => {
  const value = e.target.value;
  this.setState({searchField: value})
}

  render() {
    return (
      <div>
        <Header />
        <Main
          issues={this.state.issues}
          chengedIssues={this.chengedIssues}
          addIssues={this.addIssues}
          issuesState={this.state.issuesState}
          stateOpen={this.stateOpen}
          stateClosed={this.stateClosed}
          search={this.search}
          searchField={this.state.searchField}
          />
      </div>
    );
  }
}

export default App;

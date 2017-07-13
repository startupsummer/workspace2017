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

removeIssue = (id) => () => {
  let newState = this.state.issues.map(el => {
    if(el.id === id) {
      return Object.assign({}, el, {state: 'closed'});
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
          onDelete={this.removeIssue}
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

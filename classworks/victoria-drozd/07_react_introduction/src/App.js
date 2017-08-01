import React, {Component} from 'react';

import './App.css';
import Pagehead from './Pagehead';
import Container from './Container';

import {displayAll} from './utils';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: displayAll(props.data)
    };
  }

  handleAddNewIssue = issues => this.setState({issues});

  handleCloseIssue = (id) => {
    this.setState((prevState) => {
      const newData = prevState.issues.map(issue => {
        if (issue.id !== id) {
          return issue;
        }

        return {...issue, state: 'closed'};
      });

      return {issues: newData};
    });
  };

  handleSearchText = (text) => {
    this.setState((prevState) => {
      const newData = prevState.issues.map(issue => ({
        ...issue,
        display: Boolean(~issue.title.toLowerCase().indexOf(text.toLowerCase()))
      }));

      return {issues: newData};
    });
  };

  render() {
    const {issues} = this.state;

    return (
      <div>
        <Pagehead issuesNum={issues.length}/>
        <Container
          data={issues}
          handleAddNewIssue={this.handleAddNewIssue}
          handleCloseIssue={this.handleCloseIssue}
          handleSearchText={this.handleSearchText}
        />
      </div>
    );
  }
}

export default App;

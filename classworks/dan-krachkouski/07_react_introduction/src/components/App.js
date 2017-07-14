import React, {Component} from 'react';
import classNames from 'classnames';
import lorem from 'lorem-ipsum';

import PageHead from './PageHead';
import Issues from './Issues';

import issues from '../data.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { issues }
  }

  openIssue = () => {
    const { issues } = this.state;
    const issue = {
      title: lorem(),
      id: +Date.now(),
      state: 'open'
    };
    const newIssues = issues.splice(0);
    newIssues.push(issue);
    this.setState({
      count: newIssues.lenght,
      issues: newIssues
    });
  }

  reopenIssue = (id) => () => {
    const { issues } = this.state;
    let found = issues.find(issue => issue.id === id);
    if (found)  found.state = 'open';
    this.setState({
      count: issues.lenght,
      issues
    });
  }

  closeIssue = (id) => () => {
    const { issues } = this.state;
    let found = issues.find(issue => issue.id === id);
    if (found)  found.state = 'closed';
    this.setState({
      count: issues.lenght,
      issues
    });
  }

  render() {
    const { issues } = this.state;

    return (
      <main className="content">
        <PageHead
          user="startupsummer"
          repo="dan's_react_task"
          count={ issues.length }/>
        <Issues
          data={ issues }
          handlers={{
            openIssue: this.openIssue,
            reopenIssue: this.reopenIssue,
            closeIssue: this.closeIssue
          }}/>
      </main>);
  }
}

export default App;

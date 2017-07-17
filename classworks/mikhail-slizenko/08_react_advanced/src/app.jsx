import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Logo from './components/logo/logo';
import Repohead from './components/repohead/repohead';
import Reponav from './components/reponav/reponav';
import IssuesListing from './components/issues-listing/issues-listing';
import IssuePage from './components/issue-page/issue-page';

export default class App extends Component {
  state = {
    issuesList: [],
    issuesState: 'open',
    amtOpenIssues: 0,
    searchQuery: ''
  }

  getAmtOpenIssues(issuesList) {
    return issuesList.filter(i => i.state === 'open' && i).length
  }

  componentDidMount() {
    fetch('https://api.github.com/repos/hovoodd/fuzzy-octo-pancake/issues?access_token=ed746ed3ab74c8a0ccd49375f0240c81a70c56bc&state=all')
      .then(response => response.json())
      .then(data => {
        const issuesList = data.map(i => ({
          id: i.id,
          description: i.body,
          title: i.title,
          state: i.state,
          number: i.number
        }));
        this.setState({
          issuesList,
          amtOpenIssues: this.getAmtOpenIssues(issuesList)
        });
      })
  }

  openNewIssue = () => {
    const newIssueBody = {
      title: 'Missing builtins',
      body: 'Bash shell builtin help is missing in the guide.'
    };

    fetch('https://api.github.com/repos/hovoodd/fuzzy-octo-pancake/issues?access_token=ed746ed3ab74c8a0ccd49375f0240c81a70c56bc', {
      method: 'POST',
      body: JSON.stringify(newIssueBody)
    })
      .then(response => response.json())
      .then(data => {
        const newIssuesList = [data, ...this.state.issuesList];
        this.setState({
          issuesList: newIssuesList,
          amtOpenIssues: this.getAmtOpenIssues(newIssuesList)
        });
      })
  }

  changeIssue = issue => () => {
    issue.state === 'open'
      ? issue.state = 'closed'
      : issue.state = 'open';

    const newIssuesList = this.state.issuesList.map(i => {
      return issue.id === i.id ? issue : i
    });

    fetch(`https://api.github.com/repos/hovoodd/fuzzy-octo-pancake/issues/${issue.number}?access_token=ed746ed3ab74c8a0ccd49375f0240c81a70c56bc`, {
      method: 'PATCH',
      body: JSON.stringify({
        state: issue.state
      })})
        .then(response => response.json())
        .then(() => { this.setState({ 
          issuesList: newIssuesList,
          amtOpenIssues: this.getAmtOpenIssues(newIssuesList)
        })});
  }

  showOpenIssues = () => {
    if (this.state.issuesState === 'open') return;
    this.setState({ issuesState: 'open' });
  }

  showClosedIssues = () => {
    if (this.state.issuesState === 'closed') return;
    this.setState({ issuesState: 'closed' });
  }

  searchIssue = searchQuery => {
    this.setState({ searchQuery });
  }

  render() {
    const { 
      issuesList,
      issuesState,
      amtOpenIssues,
      searchQuery 
    } = this.state;

    return (
      <div className="app">
        <header className="header">
          <div className="container">
            <Logo />
          </div>
        </header>

        <Router>
          <main className="content">
            <section className="pagehead">
              <div className="container">
                <Repohead username='startupsummer' reponame='react-task-1' />
                <Reponav tabname='Issues' amtOpenIssues={ amtOpenIssues } />
              </div>
            </section>

            <div className="container">

              <Route exact path="/" render={ () => 
                <IssuesListing 
                  issuesList={ issuesList } 
                  issuesState={ issuesState } 
                  searchQuery={ searchQuery }
                  searchIssue={ this.searchIssue } 
                  changeIssue={ this.changeIssue } 
                  openNewIssue={ this.openNewIssue } 
                  showOpenIssues={ this.showOpenIssues } 
                  showClosedIssues={ this.showClosedIssues } 
                />
              }/>

              <Route exact path="/:id" render={ props => 
                <IssuePage issuesList={ issuesList } id={ props.match.params.id } />
              }/>

            </div>
          </main>
        </Router>
      </div>
    );
  }
}

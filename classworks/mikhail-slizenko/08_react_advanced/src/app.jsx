import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/header/header';
import Pagehead from './components/pagehead/pagehead';
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
    fetch('https://api.github.com/repos/hovoodd/studious-octo-adventure/issues?access_token=ed746ed3ab74c8a0ccd49375f0240c81a70c56bc&state=all')
      .then(response => response.json())
      .then(data => {
        const issuesList = data.map(item => ({
          id: item.id,
          description: item.body,
          title: item.title,
          state: item.state,
          number: item.number
        }));
        this.setState({
          issuesList,
          amtOpenIssues: this.getAmtOpenIssues(issuesList)
        });
      })
  }

  openNewIssue = () => {
    const newIssueBody = {
      title: 'Option to ask User Gist Description Before Creating new Gist.',
      body: 'When user creates new Gist to upload.',
      labels: ['bug']
    };

    fetch('https://api.github.com/repos/hovoodd/studious-octo-adventure/issues?access_token=ed746ed3ab74c8a0ccd49375f0240c81a70c56bc', {
      method: 'POST',
      body: JSON.stringify(newIssueBody)
    })
      .then(response => response.json())
      .then(data => {
        const newIssuesList = [...this.state.issuesList, data];
        this.setState({
          issuesList: newIssuesList,
          amtOpenIssues: this.getAmtOpenIssues(newIssuesList)
        });
      })
  }

  changeIssue = (issue) => () => {
    issue.state === 'open' ? issue.state = 'closed' : issue.state = 'open';

    const newIssuesList = this.state.issuesList.map((item, index) => {
      return issue.id === item.id ? issue : item
    });

    fetch(`https://api.github.com/repos/hovoodd/studious-octo-adventure/issues/${issue.number}?access_token=ed746ed3ab74c8a0ccd49375f0240c81a70c56bc`, {
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
    this.setState({
      issuesState: 'open'
    })
  }

  showClosedIssues = () => {
    this.setState({
      issuesState: 'closed'
    })
  }

  searchIssue = (searchQuery) => {
    this.setState({
      searchQuery
    })
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
        <Header />

        <Router>
          <main className="content">
            <Pagehead>
              <Repohead username='startupsummer' reponame='react-task-1' />
              <Reponav tabname='Issues' amtOpenIssues={ amtOpenIssues } />
            </Pagehead>

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

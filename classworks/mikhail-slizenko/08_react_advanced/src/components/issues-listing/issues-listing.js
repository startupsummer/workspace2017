import React, { Component } from 'react';

import Subnav from '../subnav/subnav';
import ButtonLink from '../button-link/button-link';
import Issues from '../issues/issues';

import data from '../../data';

import './issues-listing.css';

class IssuesListing extends Component {
  state = {
    issuesState: 'open',
    issues: data,
    value: ''
  }

  componentDidMount() {
    fetch('https://api.github.com/repos/hovoodd/studious-octo-adventure/issues?access_token=ed746ed3ab74c8a0ccd49375f0240c81a70c56bc&state=all')
      .then(response => response.json())
      .then(issues => {
        this.setState({
          issues
        });
        return issues;
      })
      .then(issues =>
        this.props.updateCountIssues(issues.filter(item => item.state === 'open').length)
      );
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

  openNewIssues = () => {
    fetch('https://api.github.com/repos/hovoodd/studious-octo-adventure/issues?access_token=ed746ed3ab74c8a0ccd49375f0240c81a70c56bc', {
      method: 'POST',
      body: JSON.stringify({
        title: 'Option to ask User Gist Description Before Creating new Gist.',
        body: 'When user creates new Gist to upload',
        labels: ['bug']
      })})
        .then(response => response.json())
        .then(data => {
          const newIssues = [...this.state.issues, data];
          this.setState({ issues: newIssues });
        })
        .then(() => {
          this.props.updateCountIssues(this.state.issues.filter(item => item.state === 'open').length);
          this.props.getIssuesList(this.state.issues);
        })
  }

  searchIssue = (value) => {
    this.setState({
      value
    })
  }

  closeIssues = (number) => () => {
    const issue = this.state.issues.filter(item => item.number === number && item );
    console.log(this.state.issues.indexOf(issue));
    
    const newIssues = this.state.issues.splice(this.state.issues.indexOf(issue), 1);
    console.log(newIssues);

    fetch('https://api.github.com/repos/hovoodd/studious-octo-adventure/issues/' + number + '?access_token=ed746ed3ab74c8a0ccd49375f0240c81a70c56bc', {
      method: 'PATCH',
      body: JSON.stringify({
        state: 'closed'
      })})
        .then(response => response.json())
        .then(data => { this.setState({ issues: newIssues })})
        .then(() => {
          this.props.updateCountIssues(this.state.issues.filter(item => item.state === 'open').length);
          this.props.getIssuesList(this.state.issues);
        })
  }

  openIssues = (id) => () => {
    const issues = this.state.issues.map(item => item.id === id ? {...item, state: 'open'} : item);
    this.setState({
      issues
    });
    this.props.updateCountIssues(issues.filter(item => item.state === 'open').length);
  }

  render() {
    const { issues, value, issuesState } = this.state;

    const searchedIssues = issues.filter(item => item.title.toLowerCase().includes(value));

    const openIssues = searchedIssues.filter(item => item.state === 'open').length;
    const closedIssues = searchedIssues.filter(item => item.state === 'closed').length;

    const filteredIssues = searchedIssues.filter(item => item.state === issuesState);

    return (
      <div className="issues-listing">
        <div className="issues-listing__subnav">
          <Subnav openNewIssues={ this.openNewIssues } searchIssue={ this.searchIssue } />
        </div>
        <div className="issues-listing__header">
          <div className="issues-listing__states">
            <ButtonLink 
              counter={ openIssues } 
              text="Open" 
              selected={ issuesState === 'open' } 
              click={ this.showOpenIssues }/>
            <ButtonLink 
              counter={ closedIssues } 
              text="Close" 
              selected={ issuesState === 'closed' } 
              click={ this.showClosedIssues } />
          </div>
        </div>
        <div className="issues-listing__body">
          <Issues 
            issues={ filteredIssues } 
            closeIssues={ this.closeIssues } 
            openIssues={ this.openIssues } />
        </div>
      </div>
    );
  }
}

export default IssuesListing;
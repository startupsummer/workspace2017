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
    this.setState({
      issues: this.state.issues.concat([{
        id: Math.round(Math.random() * 1000000000), 
        title: "Best way to load a folder of static files?",
        state: "open"
      }])
    });
    this.props.updateCountIssues(this.state.issues.filter(item => item.state === 'open').length + 1);
  }

  searchIssue = (value) => {
    this.setState({
      value
    })
  }

  closeIssues = (id) => () => {
    this.setState({
      issues: this.state.issues.map(item => item.id === id ? {...item, state: 'closed'} : item)
    });
    this.props.updateCountIssues(this.state.issues.filter(item => item.state === 'open').length - 1);
  }

  openIssues = (id) => () => {
    this.setState({
      issues: this.state.issues.map(item => item.id === id ? {...item, state: 'open'} : item)
    });
    this.props.updateCountIssues(this.state.issues.filter(item => item.state === 'open').length + 1);
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
            <ButtonLink counter={ openIssues } text="Open" selected={ issuesState === 'open' } click={ this.showOpenIssues }/>
            <ButtonLink counter={ closedIssues } text="Close" selected={ issuesState === 'closed' } click={ this.showClosedIssues } />
          </div>
        </div>
        <div className="issues-listing__body">
          <Issues issues={ filteredIssues } closeIssues={ this.closeIssues } openIssues={ this.openIssues } />
        </div>
      </div>
    );
  }
}

export default IssuesListing;
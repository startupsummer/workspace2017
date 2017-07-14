import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import IssuesItem from './issues__item';
import AboutIssue from './issues-about';

import './index.css';

class IssuesListingBody extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const findField = this.props.issues
      .filter(el => (
        el.state === this.props.issuesState &&
        el.title.toLowerCase().includes(this.props.searchField.toLowerCase())
      ));
    const arrIssues = findField.map(el => (
        <li key={el.id}>
          <IssuesItem issues={el} chengedIssues={this.props.chengedIssues}/>
        </li>
      ));
    return (
      <div className="issues-listing__body">
        <Route exact path="/" component={() => <ul className="issues">{arrIssues}</ul>}/>
        <Route path="/:id" component={({match}) => <AboutIssue match={match} issues={this.props.issues}/>}/>
      </div>
    )
  }
}

IssuesListingBody.PropTypes = {
  issues: PropTypes.array,
  chengedIssues: PropTypes.func,
  issuesState: PropTypes.string,
  searchField: PropTypes.string,
};

export default IssuesListingBody;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router-dom';

import fromStore from 'src/index.selectors';

import IssuesItem from './issues__item';
import AboutIssue from './issues-about';

import './index.css';

class IssuesListingBody extends Component {
  render() {
    const searchField = this.props.searchField;
    const curIssues = this.props.curStatus === 'open' ? this.props.closedIssues : this.props.openIssues;
    const issuesAfterFind = curIssues.filter(el =>
      el.title.toLowerCase().includes(searchField.toLowerCase())
    );
    const content = issuesAfterFind.map((ussue) => (
        <li key={ussue.id}>
          <IssuesItem issue={ussue} />
        </li>
      ));

    return (
      <div className="issues-listing__body">
        <Route exact path="/" component={() => <ul className="issues">{content}</ul>}/>
        <Route path="/:id" component={({match}) => <AboutIssue match={match} issues={issuesAfterFind}/>}/>
      </div>
    )
  }
}

IssuesListingBody.propTypes = {
  searchField: PropTypes.string.isRequired,
  curStatus: PropTypes.string.isRequired,
  closedIssues: PropTypes.array.isRequired,
  openIssues: PropTypes.array.isRequired,
}

export default withRouter(connect(state => ({
  openIssues: fromStore.getOpensIssues(state),
  closedIssues: fromStore.getClosedsIssues(state),
}))(IssuesListingBody));

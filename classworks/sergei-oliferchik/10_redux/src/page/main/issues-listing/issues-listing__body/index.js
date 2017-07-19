import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    const content = issuesAfterFind.map((el) => (
        <li key={el.id}>
          <IssuesItem issues={el} />
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

export default withRouter(connect(state => ({
  openIssues: fromStore.getOpensIssues(state),
  closedIssues: fromStore.getClosedsIssues(state),
}))(IssuesListingBody));

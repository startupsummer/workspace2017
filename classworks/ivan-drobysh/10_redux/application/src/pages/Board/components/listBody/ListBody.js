import React, { Component } from 'react';
import { connect } from 'react-redux';
import IssueItem from '../issue/IssueItem';
import { fetchIssues } from '../../../../resources/actions.js';
import selectors from '../../../../index.selectors.js'
class ListBody extends Component {

  render() {
    const issues = this.props.issues.map((issue) =>  <IssueItem issue={issue} />);
    return (
      <div className="issues-listing__body">
        <ul className="issues">
          {issues}
        </ul>
      </div>
    )
  }
}

export default connect((state) => ({
  issues: selectors.getIssues(state)
}))(ListBody);

import React, { Component } from 'react';
import Issue from '../Issue/Issue.js';

class IssuesListContainer extends Component {
  render() {
    const {issues, issuesState, handleCloseIssue, selectIssue} = this.props;
    return (
      <div className="issues-listing__body">
        <ul className="issues">
          {
            issues.filter((issue) => issue.state === issuesState).map((issue) => 
              (
                <li className="issues__item" key={issue.id} >
                  <Issue issue={issue} status={issuesState} handleCloseIssue={handleCloseIssue} />
                </li>
              )
            )
          }
        </ul>
      </div>
    )
  }
}

export default IssuesListContainer;
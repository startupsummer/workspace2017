import React, { Component } from 'react';
import Issue from '../Issue/Issue.js';

class IssuesListContainer extends Component {
  render() {
    const {issues, issuesState, handleChangeState, selectIssue} = this.props;
    return (
      <div className="issues-listing__body">
        <ul className="issues">
          {
            issues.filter((issue) => issue.state === issuesState).map((issue) => 
              (
                <li>
                  <Issue issue={issue} status={issuesState} handleChangeState={handleChangeState} />
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
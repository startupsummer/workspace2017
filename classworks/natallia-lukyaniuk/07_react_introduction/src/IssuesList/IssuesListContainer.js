import React, { Component } from 'react';
import OpenIssue from '../Issue/OpenIssue.js';
import ClosedIssue from '../Issue/ClosedIssue.js';

class IssuesListContainer extends Component {
  render() {
    const {issues, issuesState, handleCloseIssue} = this.props;
    return (
      <div className="issues-listing__body">
        <ul className="issues">
          {
            issues.filter((issue) => issue.state === issuesState).map((issue) => 
              (
              <li key={issue.id} className="issues__item">
                {
                  issuesState === 'open'
                  ? <OpenIssue issue={issue} handleCloseIssue={handleCloseIssue}/>
                  : <ClosedIssue issue={issue}/>
                }
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
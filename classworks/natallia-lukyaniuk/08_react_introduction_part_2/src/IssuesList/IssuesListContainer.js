import React, { Component } from 'react';
import Issue from '../Issue/Issue.js';

const IssuesListContainer = ({issues, issuesState, handleChangeState, selectIssue}) => (
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
export default IssuesListContainer;
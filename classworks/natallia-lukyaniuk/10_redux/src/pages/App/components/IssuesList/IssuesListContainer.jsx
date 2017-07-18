import React from 'react';
import { connect } from 'react-redux';
import Issue from '../Issue/Issue';

const IssuesListContainer = ({ issues, selectedIssues }) => (
  <div className="issues-listing__body">
    <ul className="issues">
      {
        issues.filter(issue => issue.state === selectedIssues).map(issue =>
          (
            <li key={issue.id}>
              <Issue issue={issue} />
            </li>
          ),
        )
      }
    </ul>
  </div>
);

export default connect(state => ({
  issues: state.issues.filter(item =>
    item.title.toString().toLowerCase().includes(state.issuesFilter)),
  selectedIssues: state.selectedIssues,
}), {})(IssuesListContainer);

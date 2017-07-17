import React from 'react';
import '../../../main.css';
import IssueItem from './issue_item/issue-item.js';

const IssueList = ({
    issues,
    tab,
    text,
    closeIssue,
    openIssue
  }) => (
  <div className="issues-listing__body">
    <ul className="issues">
      {
        issues
        .filter((item) => tab === item.state)
        .filter((item) => item.title.indexOf(text) !== -1)
        .map((item) => (
          <IssueItem
            key={item.id}
            state={item.state}
            body={item.body}
            title={item.title}
            issueId={item.id}
            openButton={openIssue}
            closeButton={closeIssue}
          />))}
    </ul>
  </div>
)

IssueList.propTypes = {
  openIssue: React.PropTypes.func.isRequired,
  closeIssue: React.PropTypes.func.isRequired,
  issues: React.PropTypes.array.isRequired,
  tab: React.PropTypes.string.isRequired,
  text: React.PropTypes.string.isRequired,
};

export default IssueList;

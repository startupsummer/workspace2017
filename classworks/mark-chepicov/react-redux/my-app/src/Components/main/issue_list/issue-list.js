import React from 'react';
import '../../../main.css';
import IssueItem from './issue_item/issue-item.js';
import PropTypes from 'prop-types';

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
            number={item.number}
            title={item.title}
            issueId={item.id}
            openButton={openIssue}
            closeButton={closeIssue}
          />))}
    </ul>
  </div>
)

IssueList.propTypes = {
  openIssue: PropTypes.func.isRequired,
  closeIssue: PropTypes.func.isRequired,
  issues: PropTypes.array.isRequired,
  tab: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default IssueList;

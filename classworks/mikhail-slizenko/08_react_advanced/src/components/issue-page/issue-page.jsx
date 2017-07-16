import React from 'react';

import './issue-page.css';

const IssuesPage = (props) => {
  const { id, issuesList } = props;
  let targetIssue = issuesList.filter( item => item.id === +id && item)[0];

  return (
    <div className="issue-page">
      <div className="issue-page__header">
        <h1 className="issue-page__title">{ targetIssue.title }</h1>
      </div>
      <div className="issue-page__body">
        <p className="issue-page__description">
          { targetIssue.description }
        </p>
      </div>
    </div>
  );
}

export default IssuesPage;

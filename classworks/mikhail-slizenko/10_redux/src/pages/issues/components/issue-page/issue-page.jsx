import React from 'react';
import PropTypes from 'prop-types';

import './issue-page.css';

const IssuePage = props => {
  const {id, issuesList} = props;
  const targetIssue = issuesList
    .filter(issue => issue.id === +id && issue)
    .shift();

  return (
    <div className="issue-page">
      <div className="issue-page__header">
        <h1 className="issue-page__title">
          {targetIssue.title}
        </h1>
      </div>
      <div className="issue-page__body">
        <p className="issue-page__description">
          {targetIssue.description}
        </p>
      </div>
    </div>
  );
}

IssuePage.propTypes = {
  id: PropTypes.string.isRequired,
  issuesList: PropTypes.array.isRequired
}

export default IssuePage;

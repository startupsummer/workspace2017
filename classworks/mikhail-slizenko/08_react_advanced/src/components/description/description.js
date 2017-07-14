import React, { Component } from 'react';
import Issue from '../issue/issue';

import './description.css';

class IssuesPage extends Component {
  render() {
    const issueId = this.props.id;
    const currentIssue = this.props.issuesList.filter( item => item.id == issueId )[0];

    return (
      <div className="issue-page">
        <div className="issue-page__header">
          <h1 className="issue-page__title">{ currentIssue.title }</h1>
        </div>
        <div className="issue-page__body">
          <p className="issue-page__description">
            { currentIssue.body }
          </p>
        </div>
      </div>
    );
  }
}

export default IssuesPage;
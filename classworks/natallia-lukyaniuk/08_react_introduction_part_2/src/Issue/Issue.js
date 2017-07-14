import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import OpenIssueIcon from './OpenIssueIcon';
import ClosedIssueIcon from './ClosedIssueIcon'

class Issue extends Component {
  render() {
    const {issue, handleCloseIssue, status} = this.props;
    return (
      <div>
        <div className="issues__status issues__status--open">
          {
              status === "open" ? <OpenIssueIcon /> : <ClosedIssueIcon />
          }
        </div>
        <div className="issues__title">
          <Link className="issues__link" to={`/${issue.id}`}>
            {issue.title}
          </Link>
        </div>
          {
            status === "open" && <button className="btn issue__close" type="button" onClick={handleCloseIssue.bind(null, issue.id)}> Close issue </button>
          }
      </div>
    )
  }
}

export default Issue;
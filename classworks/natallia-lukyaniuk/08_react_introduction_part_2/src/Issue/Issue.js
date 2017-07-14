import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import OpenIssueIcon from './OpenIssueIcon';
import ClosedIssueIcon from './ClosedIssueIcon'

class Issue extends Component {
  render() {
    const {issue, handleChangeState, status} = this.props;
    return (
      <div className="issues__item">
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
            status === "open"
            ? <button className="btn issue__close" value="closed" type="button" onClick={handleChangeState.bind(null, issue.id)}> Close issue </button>
            : <button className="btn issue__close" value="open" type="button" onClick={handleChangeState.bind(null, issue.id)}> Open issue </button>
          }
      </div>
    )
  }
}

export default Issue;
import React, { Component } from 'react';
import '../../main.css';

class ClosedIssue extends Component {
  render() {
    return (
      <li className="issues__item">
        <div className="issues__status issues__status--open">
          <svg aria-hidden="true"
            className="octicon octicon-check"
            height="16" version="1.1" viewBox="0 0 12 16"
            width="12"
          >
            <path fillRule="evenodd"
              d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5z"
            ></path>
          </svg>
        </div>
        <div className="issues__title">
          <a href="#" className="issues__link">
            {this.props.issue.title}
          </a>
        </div>
      </li>
    )
  }
}

export default ClosedIssue;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../main.css';

function ClosedIssue(props) {
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
        <Link className="issues__link" to={`/${props.issue.id}`} >{props.issue.title}</Link>
      </div>
    </li>
  )
}

export default ClosedIssue;

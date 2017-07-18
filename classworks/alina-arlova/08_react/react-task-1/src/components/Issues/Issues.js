import React, { Component } from 'react';
import OpenIssue from './OpenIssue.js'
import ClosedIssue from './ClosedIssue.js'
import '../../main.css';

function Issues(props) {
  return (
    <div className="issues-listing__body">
      <ul className="issues">
        {
            props.issues.filter((item) => item.state === props.menuState).map((item) =>
            <li className="issues__wrapper">
              {
                item.state === 'open'
                ? <OpenIssue issue={item} onClick={props.onClick} />
                : <ClosedIssue issue={item}/>
              }
            </li>)
        }
      </ul>
    </div>
  )
}

export default Issues;

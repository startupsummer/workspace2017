import React, { Component } from 'react';
import OpenIssue from './OpenIssue.js'
import ClosedIssue from './ClosedIssue.js'
import '../../main.css';

class Issues extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className="issues">
        {
          this.props.issues.filter((item) => item.state === this.props.menuState).map((item) =>
            <li className="issues__wrapper">
              {
                item.state === 'open'
                ? <OpenIssue issue={item} onClick={this.props.onClick} />
                : <ClosedIssue issue={item}/>
              }
            </li>)
        }
      </ul>
    )
  }
}

export default Issues;

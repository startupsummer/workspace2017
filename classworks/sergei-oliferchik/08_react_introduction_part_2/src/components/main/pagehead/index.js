import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Peponav from './reponav-item';

import './index.css';

class Pagehead extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.issues !== this.props.issues;
  }
  render() {
    const lengthIssues = this.props.issues.length;
    return (
      <div className="pagehead">
          <div className="container repohead-container">
            <h1 className="pagehead-title">
              <svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 12 16" width="12">
                <path fillRule="evenodd" d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z"></path>
              </svg>
              <a href="">startupsummer</a>
              <span>/</span>
              <b><a href="">react-task-1</a></b>
            </h1>
          </div>
          <div className="container">
            <nav className="reponav">
              <Peponav  issuesLength={lengthIssues}/>
            </nav>
          </div>
      </div>
    );
  }
}

Pagehead.PropTypes = {
  issues: PropTypes.array,
}

export default Pagehead;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import fromStore from '../../resources/issues.selector.js';
import { closeIssue } from '../../resources/issues.actions.js';
import OpenIssue from './OpenIssue.js'
import ClosedIssue from './ClosedIssue.js'
import '../../main.css';

class Issues extends React.Component {
  static propsTypes = {
    closeIssue: PropTypes.func.isRequired,
    issues: PropTypes.array.isRequired,
    menuState: PropTypes.string.isRequired,
    searchText: PropTypes.string.isRequired,
  }

  onCloseIssue = (issueId) => {
    this.props.closeIssue(issueId);
  }

  render() {
    const issues = this.props.issues;
    const menuState = this.props.menuState;
    const filteredIssues = issues.filter(issue => issue.title.toLowerCase().startsWith(this.props.searchText));

    return (
      <div className="issues-listing__body">
        <ul className="issues">
          {
            filteredIssues.filter((item) => item.state === menuState).map((issue) =>
            <li className="issues__wrapper">
              {
                issue.state === 'open'
                ? <OpenIssue issue={issue} onClick = {this.onCloseIssue} />
                : <ClosedIssue issue={issue} />
              }
            </li>)
          }
        </ul>
      </div>
    );
  }
}

export default connect(state => ({
  issues: fromStore.getIssues(state),
  menuState: fromStore.getMenuState(state),
  searchText: fromStore.getSearchText(state),
}), {
  closeIssue,
})(Issues);

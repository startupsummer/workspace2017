import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class IssuesListHeader extends Component {
  selectIssues(e) {
    this.props.handlerSelectIssues(e.target.value);
  }
  render() {
    const { issues } = this.props;
    return (
      <div className="issues-listing__header">
        <div className="issues-listing__states">
          <Link to="/">
            <button
              onClick={this.selectIssues.bind(this)}
              className="btn-link btn-link--selected"
              type="button"
              value="open"
            >
              <svg aria-hidden="true" className="octicon octicon-issue-opened" height="16" version="1.1" viewBox="0 0 14 16" width="14">
                <path fillRule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z" />
              </svg>
              {issues.filter(issue => issue.state === 'open').length} Open
            </button>
          </Link>
          <Link to="/">
            <button
              onClick={this.selectIssues.bind(this)}
              className="btn-link"
              type="button"
              value="closed"
            >
              <svg aria-hidden="true" className="octicon octicon-check" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path fillRule="evenodd" d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5z" /></svg>
              {issues.filter(issue => issue.state === 'closed').length} Closed
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  issues: state.issues,
}),
  dispatch => ({
    handlerSelectIssues: (state) => {
      dispatch({ type: 'CHANGE_SELECTED_ISSUES', state });
    },
  }),
)(IssuesListHeader);

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import OpenIssueIcon from './OpenIssueIcon';
import ClosedIssueIcon from './ClosedIssueIcon';
import { changeIssue } from '../../../../resources/issuesList/issues.actions';

class Issue extends Component {
  handleChangeIssue(number, e) {
    const {issues} = this.props;
    const issue = issues.filter(item => item.number === number);
    const newIssue = Object.assign({}, { state: e.target.value });
    this.props.changeIssue(number, newIssue);
  }
  render() {
    const { issue, issues } = this.props;
    return (
      <div className="issues__item">
        <div className="issues__status issues__status--open">
          {
              issue.state === 'open' ? <OpenIssueIcon /> : <ClosedIssueIcon />
          }
        </div>
        <div className="issues__title">
          <Link className="issues__link" onClick={this.handleSelectIssue} to={`/${issue.id}`}>
            {issue.title}
          </Link>
        </div>
        {
          issue.state === 'open'
          ? <button
            className="btn issue__close"
            onClick={this.handleChangeIssue.bind(this, issue.number)}
            value="closed"
            type="button"
          >
            Close issue
          </button>
          : <button
            className="btn issue__close"
            onClick={this.handleChangeIssue.bind(this, issue.number)}
            value="open"
            type="button"
          >
            Open issue
          </button>
        }
      </div>
    );
  }
}

export default connect(state => ({
  issues: state.issues,
}), {
  changeIssue,
})(Issue);

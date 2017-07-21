import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MyButton from '../button/button.js';
import fromStore from '../../resourses/list.selectors';
import { connect } from 'react-redux';


class List extends Component {
  render() {
    let issues = this.props.issue.state;
    let tempIssues = [];

    if(this.props.sortField.length > 0) {
      tempIssues = issues
        .filter((item) => (item.title !== undefined ? (item.title.toLowerCase() 
          .includes(this.props.sortField.toLowerCase()) === true) : null ));
    }

    if(this.props.sortField.length > 0) (issues = tempIssues)
    const issue = issues.map((issue) => {
      if(issue.state === this.props.state || this.props.state === 'all') {
        return (
            <li key={issue.id} className="issues__item">
              <div className="issues__status issues__status--open">
                <svg className="issues__icon" height="16" version="1.1" viewBox="0 0 14 16" width="14"><path fillRule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path></svg>
              </div>
              <div className="issues__title">
                <a href="#" className="issues__link">
                  <Link to={`/${issue.id}`}>{issue.title}</Link>
                </a>
              </div>

              {issue.state === 'open'
                ? <MyButton className="btn issue__close" type="button"
                    handler={this.props.handler(issue.number)} value="Close issue"
                    id={issue.id}
                  />
                : null
              }
            </li>
          )
        }
      }
    );

    return (
      <div className="issues-listing__body">
          <ul className="issues">
            {issue}
          </ul>
        </div>
    )
  }
}

List.propTypes = {
  issue: PropTypes.object.isRequired,
  sortField: PropTypes.string.isRequired,
  state: PropTypes.string,
}

export default connect(state => ({
  issue: fromStore.getList(state),
}), {
}) (List)


import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './reponav.css';

export default class Reponav extends PureComponent {
  static PropTypes = {
    tabname: PropTypes.string.isRequired,
    amtOpenIssues: PropTypes.number.isRequired
  }

  static defaultProps = {
    tabname: 'Issues'
  }

  render() {
    const { tabname, amtOpenIssues } = this.props;

    return (
      <nav className="reponav">
        <Link to="/" className="reponav-item reponav-item--selected">
          <svg className="reponav-item__img" height="16" version="1.1" viewBox="0 0 14 16" width="14">
            <path fillRule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path>
          </svg>
          <span> { tabname } </span>
          <span className="reponav-item__counter">{ amtOpenIssues }</span>
        </Link>
      </nav>
    );
  }
}

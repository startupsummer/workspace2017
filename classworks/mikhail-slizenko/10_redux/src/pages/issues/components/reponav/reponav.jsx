import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import ReponavSvg from './reponav-svg';

import './reponav.css';

class Reponav extends PureComponent {
  render() {
    const {tabname, amtOpenIssues} = this.props;

    return (
      <nav className="reponav">
        <Link to="/" className="reponav-item reponav-item--selected">
          <ReponavSvg />
          <span> {tabname} </span>
          <span className="reponav-item__counter">{amtOpenIssues}</span>
        </Link>
      </nav>
    );
  }
}

Reponav.propTypes = {
  tabname: PropTypes.string.isRequired,
  amtOpenIssues: PropTypes.number.isRequired
}

Reponav.defaultProps = {
  tabname: 'Issues'
}

export default Reponav;

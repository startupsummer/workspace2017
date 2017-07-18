import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import * as select from '../../resources/selectors';

const issueSvg = (
  <svg className="issues__icon" height="16" version="1.1" viewBox="0 0 14 16" width="14">
    <path fillRule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path>
  </svg>);

class DetailedIssue extends Component {

  render() {
    const { data } = this.props;
    if (!data) return (
      <h3>Not found!</h3>
    );
    const svgClass = classNames(
      'issues__status', {
        'issues__status--open': data.state === 'open',
        'issues__status--closed': data.state === 'closed',
    });
    return (
    <div className="container">
      <h1>{ data.title }</h1>
      <h3>{ data.body }</h3>
    </div>
    );
  }
}

DetailedIssue.propTypes = {
  data: PropTypes.object
};

export default connect((store, props) => ({
  data: select.getIssue(store, +props.match.params.id),
}))(DetailedIssue);

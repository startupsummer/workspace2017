import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Issue extends React.Component {
  render() {

    return (
      <div className = "issue">
          {this.props.issue.title}
      </div>
    );
  }
}

export default Issue;

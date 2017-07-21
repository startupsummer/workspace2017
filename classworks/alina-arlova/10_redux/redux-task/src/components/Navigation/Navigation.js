import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import fromStore from '../../resources/issues.selector.js';
import { newIssue } from '../../resources/issues.actions.js';
import { searchIssue } from '../../resources/issues.actions.js';
import SubnavSearch from './SubnavSearch.js';
import Button from '../Buttons/Button.js';
import '../../main.css';

class Navigation extends React.Component {
  static propsTypes = {
    newIssue: PropTypes.func.isRequired,
    issueId: PropTypes.number.isRequired,
  }

  onNewIssue = () => {
    this.props.newIssue(this.props.issueId);
  }

  onSearch = (event) => {
    this.props.searchIssue(event.target.value);
  }

  render() {
    return (
      <div className="issues-listing__subnav">
        <div className="subnav">
          <SubnavSearch onChange={ this.onSearch} />
          <Button text='New issue' className='btn-primary' onClick={ this.onNewIssue } />
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  issueId: fromStore.getLastIssueId(state),
}), {
  newIssue,
  searchIssue,
})(Navigation);

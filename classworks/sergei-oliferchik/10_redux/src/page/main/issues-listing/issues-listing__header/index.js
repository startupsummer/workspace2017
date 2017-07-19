import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import fromStore from 'src/index.selectors';

import ButtonLink from 'src/components/button-link';

import './index.css';

class IssuesListingHeader extends Component {
  render() {
    return(
      <div className="issues-listing__header">
        <div className="issues-listing__states">
          <Link to="/">
            <ButtonLink length={this.props.openIssues} name={'оpen'} cliked={this.props.triger('open')}/>
          </Link>
          <Link to="/">
            <ButtonLink length={this.props.closedIssues} name={'сlosed'} cliked={this.props.triger('closed')}/>
          </Link>
        </div>
      </div>
    )
  }
};

export default connect(state => ({
  openIssues: fromStore.getOpensIssues(state).length,
  closedIssues: fromStore.getClosedsIssues(state).length,
}))(IssuesListingHeader);

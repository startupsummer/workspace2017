import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SubnavSearch from './SubnavSearch';
import ButtonHandle from './ButtonHandle';
import { issueAdd } from '../resources/issue/issue.actions'
import { connect } from 'react-redux';

class IssuesListeningSubnav extends Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
    issueAdd: PropTypes.func.isRequired
  }

  render() {
    return (
      <div className="issues-listing__subnav">
        <div className="subnav">
          <SubnavSearch onSearch={this.props.onSearch}/>
          <ButtonHandle onClick={this.props.issueAdd} specClassName={'btn-primary'}> New Issue </ButtonHandle>
        </div>
      </div>
    )
  }
}

export default connect(null, {
  issueAdd,
})(IssuesListeningSubnav);

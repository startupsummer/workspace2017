import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import * as select from '../../../resources/selectors';
import * as action from '../../../resources/actions';

import Issue from './Issue';

class IssuesList extends Component {
  onActionSetIssueState = (number, notState) => () => {
    const state = notState === 'open' ? 'closed' : 'open';
    this.props.actionSetIssueState(number, state);
  };

  componentDidMount() {
    this.props.actionFetchIssues();
  }

  render() {
    const { data } = this.props;
    return (
      <div className="issues-listing__body">
        <ul className="issues">
          {data.map(issue => (
            <Issue
              key={ issue.id }
              data={ issue }
              action={ this.onActionSetIssueState } />
          ))}
        </ul>
      </div>
    );
  }
}

IssuesList.propTypes = {
  data: PropTypes.array.isRequired,
  actionSetIssueState: PropTypes.func.isRequired,
};

export default connect((store, props) => ({
  data: select.getIssues(store, props.tab, props.query),
}), {
  actionSetIssueState: action.setIssueState,
  actionFetchIssues: action.fetchIssues
})(IssuesList);

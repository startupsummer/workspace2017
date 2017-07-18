import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Issue from './Issue';

const IssuesList = ({ data, wraps }) => (
  <div className="issues-listing__body">
    <ul className="issues">
      { data.map(issue =>
        <Issue
          key={ issue.id }
          data={ issue }
          action={ wraps.setIssueState } />
      ) }
    </ul>
  </div>
);

IssuesList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  wraps: PropTypes.object.isRequired
}

export default IssuesList;

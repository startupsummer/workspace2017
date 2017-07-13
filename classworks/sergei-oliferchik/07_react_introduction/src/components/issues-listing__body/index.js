import React from 'react';
import PropTypes from 'prop-types';

import IssuesItem from '../issues__item';
import './index.css';

const IssuesListingBody = (props) => (
  <div className="issues-listing__body">
  <ul className="issues">
      {
        props.issues
          .filter(el => el.state === props.issuesState )
          .map(el => <li key={`${el.id}  li`}><IssuesItem issues={el} onDelete={props.onDelete} key={el.id}/></li>)
      }
  </ul>
</div>
);

IssuesListingBody.PropTypes = {
  issues: PropTypes.array,
  onDelete: PropTypes.func,
  issuesState: PropTypes.string,
};

export default IssuesListingBody;

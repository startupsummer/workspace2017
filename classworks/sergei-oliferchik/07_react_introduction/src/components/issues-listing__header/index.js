import React from 'react';
import PropTypes from 'prop-types';

import ButtonLink from '../button-link';

import './index.css';

const  IssuesListingHeader  = (props) => (
  <div className="issues-listing__header">
    <div className="issues-listing__states">
      <ButtonLink length={props.issuesLength} name={'Open'} cliked={props.stateOpen}/>
      <ButtonLink length={props.issuesClose} name={'Closed'} cliked={props.stateClosed}/>
    </div>
  </div>
);

IssuesListingHeader.PropTypes = {
  issuesLength: PropTypes.number,
  issuesClose: PropTypes.number,
  stateOpen: PropTypes.func,
  stateClosed: PropTypes.func,
};

export default IssuesListingHeader;

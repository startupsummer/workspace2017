import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


import ButtonLink from 'src/components/button-link';

import './index.css';

const  IssuesListingHeader  = (props) => (
  <div className="issues-listing__header">
    <div className="issues-listing__states">
      <Link to="/">
        <ButtonLink length={props.issuesLength} name={'Open'} cliked={props.stateOpen}/>
      </Link>
      <Link to="/">
        <ButtonLink length={props.issuesClose} name={'Closed'} cliked={props.stateClosed}/>
      </Link>
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

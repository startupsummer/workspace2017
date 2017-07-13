import React, { Component } from 'react';

import ButtonLink from '../button-link';

import './index.css';


const  IssuesListingHeader  = (props) => (
  <div className="issues-listing__header">
    <div className="issues-listing__states">
      <ButtonLink length={props.issuesLength} name={'Open'}/>
      <ButtonLink length={props.issuesClose} name={'Closed'}/>
    </div>
  </div>
);

export default IssuesListingHeader;

import React, { Component } from 'react';

import ButtonLink from '../button-link';

import './index.css';


const  IssuesListingHeader  = () => (
  <div className="issues-listing__header">
    <div className="issues-listing__states">
      <ButtonLink />
      <ButtonLink />
    </div>
  </div>
);

export default IssuesListingHeader;

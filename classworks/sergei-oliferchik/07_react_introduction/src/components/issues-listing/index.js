import React, { Component } from 'react';

import './index.css';


import Subnav from '../subnav';
import IssuesListingHeader from '../issues-listing__header';
import IssuesListingBody from '../issues-listing__body';

const  IssuesListing  = () => (
  <div className="container">
    <div className="issues-listing">
      <Subnav />
      <IssuesListingHeader />
      <IssuesListingBody />
    </div>
  </div>
)

export default IssuesListing;

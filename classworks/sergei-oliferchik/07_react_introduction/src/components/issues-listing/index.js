import React, { Component } from 'react';

import './index.css';


import Subnav from '../subnav';
import IssuesListingHeader from '../issues-listing__header';

const  IssuesListing  = () => (
  <div className="container">
    <div className="issues-listing">
      <Subnav />
      <IssuesListingHeader />
    </div>
  </div>
)

export default IssuesListing;

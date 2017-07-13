import React, { Component } from 'react';

import './index.css';


import Subnav from '../subnav';
import IssuesListingHeader from '../issues-listing__header';
import IssuesListingBody from '../issues-listing__body';

const  IssuesListing  = (props) => (
  <div className="container">
    <div className="issues-listing">
      <Subnav text={'new issues'} color={'btn-primary'}/>
      <IssuesListingHeader
        issuesLength={
          props.issues
            .filter(el => el.state === "open" )
            .length
        }
        issuesClose={
          props.issues
            .filter(el => el.state === "closed" )
            .length
        }
      />
      <IssuesListingBody issues={props.issues}/>
    </div>
  </div>
)

export default IssuesListing;

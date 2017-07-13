import React, { Component } from 'react';

import IssuesItem from '../issues__item';
import './index.css';


const  IssuesListingBody  = () => (
  <div className="issues-listing__body">
  <ul className="issues">
    <li >
      <IssuesItem />
      <IssuesItem />
    </li>
  </ul>
</div>
);

export default IssuesListingBody;

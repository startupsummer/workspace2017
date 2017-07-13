import React, { Component } from 'react';

import IssuesItem from '../issues__item';
import './index.css';


const  IssuesListingBody = (props) => (

  <div className="issues-listing__body">
  <ul className="issues">
      {
        props.issues
          .filter(el => el.state === "open" )
          .map(el => <li ><IssuesItem issues={el.title}/></li>)
      }
  </ul>
</div>
);

export default IssuesListingBody;

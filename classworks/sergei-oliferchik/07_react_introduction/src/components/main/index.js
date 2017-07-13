import React, { Component } from 'react';

import Pagehead from '../pagehead/index';
import IssuesListing from '../issues-listing';

import './index.css';



const  Main  = (props) => (
  <main className='content'>
    <Pagehead issues={props.issues}/>
    <IssuesListing issues={props.issues}/>
  </main>
)

export default Main;

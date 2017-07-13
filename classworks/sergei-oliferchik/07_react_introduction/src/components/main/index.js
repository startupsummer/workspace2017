import React, { Component } from 'react';

import Pagehead from '../pagehead/index';
import IssuesListing from '../issues-listing';

import './index.css';



const  Main  = () => (
  <main className='content'>
    <Pagehead />
    <IssuesListing />
  </main>
)

export default Main;

import React from 'react';

import Pagehead from './pagehead';
import IssuesListing from './issues-listing';

import './index.css';

const Main = () => (
  <main className='content'>
    <Pagehead />
    <IssuesListing />
  </main>
);

export default Main;

import React from 'react';
import PropTypes from 'prop-types';

import Pagehead from './pagehead';
import IssuesListing from './issues-listing';

import './index.css';

const  Main  = (props) => (
  <main className='content'>
    <Pagehead />
    <IssuesListing />
  </main>
);

export default Main;

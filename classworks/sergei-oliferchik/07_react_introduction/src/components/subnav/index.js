import React, { Component } from 'react';

import Search from '../subnav__search';
import Button from '../button';

import './index.css';


const  Subnav  = () => (
  <div className="issues-listing__subnav">
    <div className="subnav">
        <Search />
        <Button />
    </div>
  </div>
)

export default Subnav;

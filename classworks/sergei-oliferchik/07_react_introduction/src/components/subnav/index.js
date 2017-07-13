import React, { Component } from 'react';

import Search from '../subnav__search';
import Button from '../button';

import './index.css';


const  Subnav  = (props) => (
  <div className="issues-listing__subnav">
    <div className="subnav">
        <Search />
        <Button text={props.text} color={props.color}/>
    </div>
  </div>
)

export default Subnav;

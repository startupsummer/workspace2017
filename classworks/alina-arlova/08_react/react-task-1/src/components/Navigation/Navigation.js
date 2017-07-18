import React, { Component } from 'react';
import SubnavSearch from './SubnavSearch.js';
import Button from '../Buttons/Button.js';
import '../../main.css';

function Navigation(props) {
  return (
    <div className="issues-listing__subnav">
      <div className="subnav">
        <SubnavSearch onChange={props.onSearchChange} />
        <Button text='New issue' className='btn-primary' onClick={props.onButtonClick} />
      </div>
    </div>
  )
}

export default Navigation;

import React, { Component } from 'react';

import './index.css';

const  Button  = (props) => (
  <button className={`btn ${props.color}`} type="button">
    {props.text}
  </button>
)

export default Button;

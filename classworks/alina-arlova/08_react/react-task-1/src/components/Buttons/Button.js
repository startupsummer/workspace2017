import React, { Component } from 'react';
import '../../main.css';

function Button(props) {
  return (
    <button
      className={`btn ${props.className}`} type="button"
      onClick={props.onClick}
    >
      {props.text}
    </button>
  )
}

export default Button;

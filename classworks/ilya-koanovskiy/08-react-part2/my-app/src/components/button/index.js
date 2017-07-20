import React, { Component } from 'react';

function Button(props){
  return(
    <button className={props.class}  type="button" onClick={props.onClick}>{props.text}</button>
  )
}

export default Button;
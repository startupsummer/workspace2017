import React, { Component } from 'react'

function MyButton(props) {
  return(
    <button className={props.className} onClick = {props.handler}>
      {props.number} {props.value}
    </button>
  )
}

export default MyButton;

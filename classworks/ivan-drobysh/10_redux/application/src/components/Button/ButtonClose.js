import React, { Component } from 'react';

function ButtonClose (props) {
  return (
      <button onClick={props.onClick} className="btn issue__close" type="button">
        {
          props.state === 'open'
          ? <span> Close issue </span>
          : <span> Open issue </span>
        }
      </button>
  )
}

export default ButtonClose;

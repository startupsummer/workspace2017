import React, { Component } from 'react';

function ButtonClose (props) {
  return (
    <div className="issues-listing__subnav">
      <button onClick={props.onClick} className="btn issue__close" type="button">
        {
          props.state === 'open'
          ? <span> Close issue </span>
          : <span> Open issue </span>
        }
      </button>
    </div>
  )
}

export default ButtonClose;

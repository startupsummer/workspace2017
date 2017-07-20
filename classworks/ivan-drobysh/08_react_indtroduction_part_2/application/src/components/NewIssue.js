import React, { Component } from 'react';

function NewIssue (props) {
  return (
    <div className="issues-listing__subnav">
      <button onClick={props.onClick} className="btn btn-primary" type="button">
        New issue
      </button>
    </div>
  )
}

export default NewIssue;

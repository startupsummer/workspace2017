import React, { Component } from 'react';
import '../../main.css'

function Description(props) {
  return(
    <div>
      {
        props.issues.filter((item) =>
        {
          if(item.id == props.match.params.id) {
            return item;
          }
        }).map((item) =>
          <div>
            <h1>{item.title}</h1>
            <p>{item.description}</p>
          </div>
        )
      }
    </div>
  );
}

export default Description;

import React, { Component } from 'react';
import '../../main.css'

class Description extends React.Component {
  render() {
    const issues = this.props.issues;
    const id = +this.props.id;

    return(
      <div>
      {
        issues.filter((item) =>
          {
            if(item.id == id) {
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
}

export default Description;

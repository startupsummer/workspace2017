import React, { Component } from 'react';
import '../../main.css'

class Description extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        {
          this.props.issues.filter((item) =>
          {
            if(item.id == this.props.match.params.id) {
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

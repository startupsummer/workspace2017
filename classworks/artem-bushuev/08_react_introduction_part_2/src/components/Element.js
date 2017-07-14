import React, { Component } from 'react';

class Element extends Component {
  render() {
    console.log( this.props );
    console.log(this.props.status.data.findById(this.props.status.id));
    var item = this.props.status.data.findById(this.props.status.id);
    return (
     <div>
       { 
         item ? item.context : "doesn't exist"
      }
      </div>
    );
  }
}

export default Element;
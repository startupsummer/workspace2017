import React, { Component } from 'react';

class AllShow extends Component {
  render() {
    let className = "btn-link ";
    if(this.props.state === 'all') className+= "btn-link--selected";
    return (
      <button onClick={this.props.show} className={className} type="button">
        All
      </button>
    )
  }
}

export default AllShow;

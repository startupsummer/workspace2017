import React, { Component } from 'react';
import {Link } from 'react-router-dom';

class AllShow extends Component {
  render() {
    let className = "btn-link ";
    if(this.props.state === 'all') className+= "btn-link--selected";
    return (
      <Link to='/'>
        <button onClick={this.props.show} className={className} type="button">
          All
        </button>
      </Link>
    )
  }
}

export default AllShow;

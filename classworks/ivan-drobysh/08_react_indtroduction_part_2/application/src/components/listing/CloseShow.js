import React, { Component } from 'react';
import {Link } from 'react-router-dom';

class CloseShow extends Component {
  render() {
    let className = "btn-link ";
    if(this.props.state === 'closed') className+= "btn-link--selected";
    return (
      <Link to='/'>
        <button onClick={this.props.show} className={className} type="button">
          <svg aria-hidden="true" className="octicon octicon-check" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5z"></path></svg>
          {this.props.close} Closed
        </button>
      </Link>
    )
  }
}

export default CloseShow;

import React, { Component } from 'react';

class ButtonClose extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="issues-listing__subnav">
        <button onClick={this.props.onClick} className="btn issue__close" type="button">
          {
            this.props.state === 'open'
            ? <span> Close issue </span>
            : <span> Open issue </span>
          }
        </button>
      </div>
    )
  }
}

export default ButtonClose;

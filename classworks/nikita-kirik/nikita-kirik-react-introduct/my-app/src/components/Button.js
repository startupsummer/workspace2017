import React, { Component } from 'react';

class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button className="btn btn-primary" type="button">
      {this.props.children}
      </button>
  )
  }
}

export default Button;

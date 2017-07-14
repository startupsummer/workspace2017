import React, { Component } from 'react';
import '../../main.css';

class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button
        className={'btn ' + this.props.className} type="button"
        onClick={this.handleClick = () => {this.props.onClick();}}
      >
        {this.props.text}
      </button>
    )
  }
}

export default Button;

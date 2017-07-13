import React, { Component } from 'react';
import './main.css';

class Button extends Component {
  render() {
    return (
      <button className={'btn ' + this.props.className} type="button">
        {this.props.text}
      </button>
    )
  }
}

export default Button;

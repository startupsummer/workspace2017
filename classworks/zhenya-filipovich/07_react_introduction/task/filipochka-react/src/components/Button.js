import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  static propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
  }
  render() {
    return (
      <button
        className={this.props.className}
        type="button"
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    )
  }
}

export default Button;

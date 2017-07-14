import React, { Component } from 'react';
import cx from 'classnames';

import './button.css';

class Button extends Component {
  render() {
    const btnClass = cx({
      btn: true,
      'btn--primary': this.props.primary
    });

    return (
      <button className={btnClass} onClick={ this.props.click }>{this.props.text}</button>
    );
  }
}

export default Button;
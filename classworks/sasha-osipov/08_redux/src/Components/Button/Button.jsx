import React, { Component } from 'react';
import cx from 'classnames';
import './Button.css';

class Button extends Component {
  
  render() {
    const buttonStyles = cx({
      'btn': this.props.btn,
      'btn-primary': this.props.primary,
      'btn-link': this.props.link,
      'btn-link--selected': this.props.selected,
    })
  
    return (
      <button className={ buttonStyles } type="button" onClick={ this.props.click }>
        { this.props.text }
      </button>
    );
  }
}

export default Button;
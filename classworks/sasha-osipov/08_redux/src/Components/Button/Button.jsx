import React, { Component } from 'react';
import cx from 'classnames';
import './Button.css';
import PropTypes from 'prop-types';

class Button extends Component {

  static propsTypes = {
      click: PropTypes.func.isRequired,
      text: PropTypes.string.isRequired,
  }
  
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
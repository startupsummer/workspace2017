import React, { Component } from 'react';
import cx from 'classnames';
import './Main.css';

class Button extends Component {
  static propTypes = {
    primary: React.PropTypes.bool,
    link: React.PropTypes.bool,
    text: React.PropTypes.string.isRequired,
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
        { this.props.children }
      </button>
    );
  }
}

export default Button;
import React, { Component } from 'react';
import cx from 'classnames';

import './button.css';

const Button = (props) => {
  const btnClass = cx({
      btn: true,
      'btn--primary': props.primary
    });

  return <button className={ btnClass } onClick={ props.click }>{ props.text }</button>
}

Button.propTypes = {
  primary: React.PropTypes.bool,
  click: React.PropTypes.func.isRequired,
  text: React.PropTypes.string.isRequired
};

export default Button;
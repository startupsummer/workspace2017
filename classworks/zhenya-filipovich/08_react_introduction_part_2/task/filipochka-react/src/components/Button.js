import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) =>(
  <button
    className={props.className}
    type="button"
    onClick={props.onClick}
  >
    {props.children}
  </button>
);

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
}

export default Button;

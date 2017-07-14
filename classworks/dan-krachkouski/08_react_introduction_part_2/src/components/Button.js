import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Button = ({ type, children, click }) => (
  <button
    className={ type }
    onClick={ click }
    type="button">
      { children }
  </button>
);

Button.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node,
  click: PropTypes.func
};

export default Button;

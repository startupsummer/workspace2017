import React from 'react';
import PropTypes from 'prop-types';
import './button.styles.css';

const Button = ({ className, onClick, children }) => (
  <button
    className={className}
    type="button"
    onClick={onClick}
  >
    {children}
  </button>
);

Button.propTypes = {
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;

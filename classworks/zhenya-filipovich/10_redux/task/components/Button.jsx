import React from 'react';
import PropTypes from 'prop-types';

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
  children: PropTypes.node.isRequired,
};

export default Button;

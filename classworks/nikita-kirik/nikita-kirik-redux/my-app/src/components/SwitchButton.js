import React from 'react';
import PropTypes from 'prop-types';

const SwitchButton = ({ onClick, children }) => (
  <button onClick={onClick} className="btn-link btn-link--selected" type="button">
    {children}
  </button>
);

SwitchButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.array.isRequired,
};

export default SwitchButton;

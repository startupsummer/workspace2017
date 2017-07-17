import React, { Component } from 'react';

const SwitchButton = ({ onClick, children }) => (
  <button onClick={onClick} className="btn-link btn-link--selected" type="button">
    {children}
  </button>
);

SwitchButton.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  children: React.PropTypes.array.isRequired,
};

export default SwitchButton;

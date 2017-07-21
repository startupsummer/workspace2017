import React from 'react';
import PropTypes from 'prop-types';

const ButtonHandle = ({ onClick, children, specClassName }) => (
  <button onClick={onClick} className={`btn ${specClassName}`} type="button">
    {children}
  </button>
)

ButtonHandle.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
  specClassName: PropTypes.string.isRequired,
}

export default ButtonHandle;

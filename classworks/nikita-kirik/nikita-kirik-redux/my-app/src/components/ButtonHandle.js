import React from 'react';

const ButtonHandle = ({ onClick, children }) => (
  <button onClick={onClick} className="btn issue__close" type="button">
    {children}
  </button>
)

ButtonHandle.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  children: React.PropTypes.string.isRequired,
}

export default ButtonHandle;

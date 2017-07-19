import React from 'react';

const ButtonHandle = ({ onClick, children, specClassName }) => (
  <button onClick={onClick} className={`btn ${specClassName}`} type="button">
    {children}
  </button>
)

ButtonHandle.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  children: React.PropTypes.string.isRequired,
  specClassName: React.PropTypes.string.isRequired,
}

export default ButtonHandle;

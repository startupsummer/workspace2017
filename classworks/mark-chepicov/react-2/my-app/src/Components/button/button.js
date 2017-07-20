import '../../main.css';
import React from 'react';

const Button = ({
  text,
  className,
  buttonClick,
  issueId
}) => (
  <button className={`btn ${className}`} type="button" onClick={buttonClick(issueId)}>
    {text}
  </button>
)

Button.propTypes = {
  text: React.PropTypes.string.isRequired,
  className: React.PropTypes.string.isRequired,
  click: React.PropTypes.func.isRequired,
  issueId: React.PropTypes.string,
}

export default Button;
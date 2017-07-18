import '../../main.css';
import React from 'react';

const Button = ({
  text,
  className,
  buttonClick,
  issueId,
  number,
}) =>  (
  <button className={`btn ${className}`} type="button" onClick={() => buttonClick(issueId, number)}>
    {text}
  </button>
)

Button.propTypes = {
  text: React.PropTypes.string.isRequired,
  className: React.PropTypes.string.isRequired,
  buttonClick: React.PropTypes.func.isRequired,
  issueId: React.PropTypes.string,
  number: React.PropTypes.number,
}

export default Button;
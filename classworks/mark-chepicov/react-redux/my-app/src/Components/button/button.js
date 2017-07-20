import '../../main.css';
import React from 'react';
import PropTypes from 'prop-types';

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
  text: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  buttonClick: PropTypes.func.isRequired,
  issueId: PropTypes.string,
  number: PropTypes.number,
}

export default Button;
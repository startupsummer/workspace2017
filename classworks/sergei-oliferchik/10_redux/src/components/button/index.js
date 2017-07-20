import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

const Button = (props) => (
  <button className={`btn ${props.color}`} type="button" onClick={props.eventClick}>
    {props.text}
  </button>
);

Button.PropTypes = {
  eventClick:  PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
}

export default Button;

import React from 'react';
import './index.css';
import PropTypes from 'prop-types';

function Button(props){
  return(
    <button className={props.class}  type="button" onClick={props.onClick}>{props.text}</button>
  )
}


Button.propTypes = {
  class: PropTypes.string.isRequired,
  click: PropTypes.func,
  text: PropTypes.string.isRequired
}

export default Button;



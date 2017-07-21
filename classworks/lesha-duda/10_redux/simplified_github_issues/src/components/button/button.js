import React from 'react'
import PropTypes from 'prop-types';


function MyButton(props){
  return(
    <button className={props.className} onClick = {props.handler}>
      {props.number} {props.value}
    </button>
  )
}

MyButton.propTypes = {
  className: PropTypes.string,
  handler: PropTypes.func,
  number: PropTypes.number,
  value: PropTypes.string
} 

export default MyButton;
import React from 'react';

function Button (props) {
  return (
      <button onClick={props.onClick} className={'btn ' + props.className} type="button">
        {
          props.text
        }
      </button>
  )
}

export default Button;

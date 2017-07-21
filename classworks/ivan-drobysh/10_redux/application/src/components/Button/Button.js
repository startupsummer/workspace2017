import React from 'react';
import PropTypes from 'prop-types';

function Button (props) {
  return (
      <button onClick={props.onClick} className={'btn ' + props.className} type="button">
        {
          props.text
        }
      </button>
  )
}
Button.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func
};
export default Button;

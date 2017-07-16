import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './button.css';

const Button = ({ primary, click, children }) => {
  const btnClass = cx({
    'btn': true,
    'btn--primary': primary
  });

  return <button className={ btnClass } onClick={ click }>{ children }</button>
}

Button.propTypes = {
  primary: PropTypes.bool,
  click: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired
}

export default Button;

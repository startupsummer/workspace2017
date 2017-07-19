import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './button.styles';


const Button = ({ onClick, title, small }) => (
  <div className={cx('button', { 'button--small': small })} onClick={onClick}>
    <div className=""></div>
    {title}
  </div>
);

Button.propsTypes = {
  onClick: PropTypes.func.isRequired,

  title: PropTypes.object.isRequired,
  small: PropTypes.bool,
};

export default Button;

import React, { Component } from 'react';
import cx from 'classnames';

import './button-link.css';

const ButtonLink = (props) => {
  const btnClass = cx({
    'btn-link': true,
    'btn-link--selected': props.selected
  });

  return (<button className={ btnClass } onClick={ props.click }>{ props.counter } { props.text }</button>);
}

ButtonLink.propTypes = {
  selected: React.PropTypes.bool,
  click: React.PropTypes.func.isRequired,
  counter: React.PropTypes.number,
  text: React.PropTypes.string.isRequired
};

export default ButtonLink;
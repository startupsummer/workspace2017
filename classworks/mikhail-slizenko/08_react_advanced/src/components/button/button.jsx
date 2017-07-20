import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './button.css';

export default class Button extends PureComponent {
  static propTypes = {
    primary: PropTypes.bool,
    click: PropTypes.func.isRequired,
    children: PropTypes.string.isRequired
  }

  render() {
    const { click, children, primary } = this.props;

    const btnClass = cx({
      'btn': true,
      'btn--primary': primary
    });

    return <button className={ btnClass } onClick={ click }>{ children }</button>
  }
}
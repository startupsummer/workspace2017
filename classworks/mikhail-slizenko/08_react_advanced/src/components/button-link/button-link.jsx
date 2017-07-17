import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './button-link.css';

export default class ButtonLink extends PureComponent {
  static propTypes = {
    selected: PropTypes.bool,
    click: PropTypes.func.isRequired,
    counter: PropTypes.number,
    children: PropTypes.string.isRequired
  };

  render() {
    const { selected, click, counter, children } = this.props;

    const btnClass = cx({
      'btn-link': true,
      'btn-link--selected': selected
    });

    return  <button className={ btnClass } onClick={ click }>{ counter } { children }</button>
  }
}

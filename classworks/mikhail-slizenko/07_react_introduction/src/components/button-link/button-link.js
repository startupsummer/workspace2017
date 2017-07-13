import React, { Component } from 'react';
import cx from 'classnames';

import './button-link.css';

class ButtonLink extends Component {
  render() {
    const btnClass = cx({
      'btn-link': true,
      'btn-link--selected': this.props.selected
    });

    return (
      <button className={btnClass} onClick={ this.props.click }>
        {this.props.counter} {this.props.text}
      </button>
    );
  }
}

export default ButtonLink;
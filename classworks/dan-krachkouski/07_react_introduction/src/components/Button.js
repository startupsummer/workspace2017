import React, {Component} from 'react';
import classNames from 'classnames';

class Button extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      type,
      children,
      click
    } = this.props;

    return (
      <button
        className={ type }
        onClick={ click }
        type="button">
          { children }
      </button>);
  }
}

export default Button;

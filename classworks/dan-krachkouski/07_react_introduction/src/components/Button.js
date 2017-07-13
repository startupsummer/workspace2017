import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

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

Button.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node,
  click: PropTypes.func
}

export default Button;

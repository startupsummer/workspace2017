import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Logo from '../logo/logo';

import './header.css';

export default class Header extends PureComponent {
  PropTypes = {
    children: PropTypes.node.isRequired
  }

  render() {
    return (
      <header className="header">
        <div className="container">
          <Logo />
        </div>
      </header>
    );
  }
}

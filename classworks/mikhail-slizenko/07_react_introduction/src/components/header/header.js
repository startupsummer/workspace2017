import React, { Component } from 'react';
import Container from './../container/container';
import Logo from './../logo/logo';

import './header.css';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <Container>
          <Logo />
        </Container>
      </div>
    );
  }
}

export default Header;
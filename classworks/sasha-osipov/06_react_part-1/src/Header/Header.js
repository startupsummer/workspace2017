import React, { Component } from 'react';
import logo from './github-logo.svg';
import './Header.css';

class Header extends Component {
  render() {
    return (
        <header className="header">
            <div className="container">
                <a className="header-logo" href="https://github.com/">
                    <img src={logo} alt="github-logo"></img>
                </a>
            </div>
        </header>
    );
  }
}

export default Header;
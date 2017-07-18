import React, { Component } from 'react';
import logo from './github-logo.svg';
import './Logo.css';

const Logo = () => (
  <a className="header-logo" href="https://github.com/">
    <img src={ logo } alt="github-logo"></img>
  </a>
);

export default Logo;
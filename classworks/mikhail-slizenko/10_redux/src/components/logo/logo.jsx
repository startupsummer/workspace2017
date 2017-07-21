import React from 'react';

import LogoSvg from './logo-svg';
import './logo.css';

const Logo = () =>
  <div className="logo">
    <a href="/" className="logo__link">
      <LogoSvg />
    </a>
  </div>

export default Logo;

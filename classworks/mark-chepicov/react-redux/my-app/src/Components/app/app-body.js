import React, { PureComponent } from 'react';
import Header from '../header/header.js';
import Main from '../main/main.js';
import { withRouter } from 'react-router';

const HeaderWithRouter = withRouter(Header);
const MainWithRouter = withRouter(Main);

class AppBody extends PureComponent {
  render() {
    return (
      <div>
        <HeaderWithRouter/>
        <MainWithRouter />
      </div>
    );
  }
}

export default withRouter(AppBody);
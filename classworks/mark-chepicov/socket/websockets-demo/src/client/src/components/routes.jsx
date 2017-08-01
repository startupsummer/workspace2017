import React from 'react';
import { Route } from 'react-router-dom';

import Chat from './chat';
import Profile from './profile';


export default class Routes extends React.Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Chat} />
        <Route path="/profile" component={Profile} />
      </div>
    );
  }
}

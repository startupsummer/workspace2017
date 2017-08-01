import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { setUser } from 'resources/user/user.actions';
import storage from 'services/storage';
import Routes from 'components/routes';
import Header from './components/header';
import './layout.styles';

class Layout extends React.Component {

  componentDidMount = () => {
    let username;
    const user = storage.getItem('USER');
    
    if (user) {
      username = user.username; 
    } else {
      username = prompt('Please enter your username', 'harrypotter');
    }
    this.props.setUser({ username });
  }

  render() {
    return (
      <div>
        <Header />

        <div className="page">
          <Routes />
        </div>
      </div>
    );
  }
}

export default withRouter(connect(null, {
   setUser,
})(Layout));

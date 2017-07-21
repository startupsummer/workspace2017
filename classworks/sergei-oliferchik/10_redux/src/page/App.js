import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { initialState } from 'src/resources/actions';

import Header from './header/index';
import Main from './main/index';

class App extends Component {
  componentDidMount = () => {
    this.props.initialState();
  }

  render() {
    return (
      <div>
        <Header />
        <Main />
      </div>
    );
  }
}

App.propTypes = {
  initialState: PropTypes.func.isRequired,
}

export default withRouter(connect(null, {
  initialState,
})(App));

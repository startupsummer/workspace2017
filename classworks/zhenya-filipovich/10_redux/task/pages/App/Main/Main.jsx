import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getDataFromServer } from 'index.selectors';
import PageHead from './PageHead';
import Container from './Container';
import './main.styles.css';

class Main extends Component {
  static propTypes = {
    getDataFromServer: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.getDataFromServer();
  }

  render() {
    return (
      <main className="content">
        <PageHead />
        <Container />
      </main>
    );
  }
}

export default connect(null, {
  getDataFromServer,
},
)(Main);

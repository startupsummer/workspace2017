import React, { Component } from 'react';
import Container from './../container/container';
import Repohead from './../repohead/repohead';
import Reponav from './../reponav/reponav';

import './pagehead.css';

class Pagehead extends Component {
  render() {
    return (
      <section className="pagehead">
        <Container>
          <Repohead username="startupsummer" reponame="react-task-1" />
          <Reponav tabname="Issues" count={ this.props.count } />
        </Container>
      </section>
    );
  }
}

export default Pagehead;
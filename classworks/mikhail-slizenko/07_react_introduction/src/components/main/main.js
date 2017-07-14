import React, { Component } from 'react';
import Container from './../container/container';
import Pagehead from './../pagehead/pagehead';
import IssuesListing from './../issues-listing/issues-listing';

import './main.css';

class Main extends Component {
  state ={
    count: 4
  }

  updateCountIssues = (count) => {
    this.setState({
      count
    })
  }


  render() {


    return (
      <main className="content">
        <Pagehead count={ this.state.count } />
        <Container>
          <IssuesListing updateCountIssues={ this.updateCountIssues } />
        </Container>
      </main>
    );
  }
}

export default Main;
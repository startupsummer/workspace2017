import React, { Component } from 'react';
import Container from './../container/container';
import Pagehead from './../pagehead/pagehead';
import IssuesListing from './../issues-listing/issues-listing';

import './main.css';

class Main extends Component {

  constructor() {
    super();
    let temp = 0;
    let idInter = setI
  }

  state ={
    count: 5
  }

  updateCountIssues = (count) => {
      setState({
        count
      })
  // }

  // setTimeout(updateCountIssues, 1000);


  render() {


    return (
      <main className="content">
        <Pagehead cointIssue={ this.temp } />
        <Container>
          <IssuesListing updateCountIssues={ this.updateCountIssues } />
        </Container>
      </main>
    );
  }
}

export default Main;
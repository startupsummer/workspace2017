import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Container from './../container/container';
import Pagehead from './../pagehead/pagehead';
import IssuesListing from './../issues-listing/issues-listing';
import IssuePage from './../description/description';

import data from '../../data';

import './main.css';

class Main extends Component {
  state ={
    issuesList: data
  }

  componentDidMount() {
    fetch('https://api.github.com/repos/hovoodd/studious-octo-adventure/issues?access_token=ed746ed3ab74c8a0ccd49375f0240c81a70c56bc&state=all')
      .then(response => response.json())
      .then(issuesList => {
        this.setState({
          issuesList
        });
      });
  }

  updateCountIssues = (count) => {
    this.setState({
      count
    });
  }

  getIssuesList = (issuesList) => {
    this.setState({
      issuesList
    });
  }

  updateComponent = () => this.forceUpdate();

  render() {
    return (
      <Router>
        <main className="content">
          <Pagehead count={ this.state.count } />
          <Container>
            <Route exact path="/" render={ () => 
              <IssuesListing updateComponent={ this.updateComponent } updateCountIssues={ this.updateCountIssues } getIssuesList={ this.getIssuesList } /> 
            }/>
            <Route exact path="/:id" render={ props => 
              <IssuePage issuesList={ this.state.issuesList } id={ props.match.params.id }/>
            }/>
          </Container>
        </main>
      </Router>
    );
  }
}

export default Main;
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import Pagehead from './Pagehead';
import Container from './Container';
import Description from './Description';


import { fetchIssues, closeIssue } from './resources/issues.actions';
import fromStore from './resources/issues.selectors';

class App extends Component {
  componentDidMount = () => {
    this.props.fetchIssues();
  };

  handleAddNewIssue = issues => this.setState({issues});

  handleSearchText = (text) => {
    this.setState((prevState) => {
      const newData = prevState.issues.map(issue => ({
        ...issue,
        display: Boolean(~issue.title.toLowerCase().indexOf(text.toLowerCase()))
      }));

      return {issues: newData};
    });
  };

  render() {
    const issues = this.props.issues;

    return (
      <Router>
        <div>
          <Pagehead issuesNum={issues.length} />
          <Route exact path="/" component={() => (
            <Container
              data={issues}
              handleAddNewIssue={this.handleAddNewIssue}
              handleCloseIssue={this.props.handleCloseIssue}
              handleSearchText={this.handleSearchText}
            />
          )}/>
          <Route
            exact path="/:id"
            component={({match}) => (<Description issue={issues.find(elem => elem.id === +match.params.id)}/>)}
          />
        </div>
      </Router>
    );
  }
}

export default connect(state => ({
  issues: fromStore.getIssues(state),
}), {
  fetchIssues,
  handleCloseIssue: closeIssue
})(App);

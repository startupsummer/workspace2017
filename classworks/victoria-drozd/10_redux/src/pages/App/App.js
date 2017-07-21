import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './App.css';
import Pagehead from './components/Pagehead';
import Container from '../Container/Container';
import Description from '../Description/Description';


import { fetchIssues, closeIssue, searchText } from '../../resources/issues.actions';
import fromStore from '../../resources/issues.selectors';

class App extends Component {
  static propsTypes = {
    fetchIssues: PropTypes.func.isRequired,
    handleCloseIssue: PropTypes.func.isRequired,
    handleSearchText: PropTypes.func.isRequired,

    issues: PropTypes.array.isRequired,
  };

  componentDidMount = () => {
    this.props.fetchIssues();
  };

  render() {
    const issues = this.props.issues;

    console.log(issues);

    return (
      <Router>
        <div>
          <Pagehead issuesNum={issues.length} />
          <Route exact path="/" component={() => (
            <Container
              data={issues}
              handleCloseIssue={this.props.handleCloseIssue}
              handleSearchText={this.props.handleSearchText}
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
  handleCloseIssue: closeIssue,
  handleSearchText: searchText
})(App);

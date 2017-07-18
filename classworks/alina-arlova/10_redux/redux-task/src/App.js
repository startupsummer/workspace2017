import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import fromStore from './index.selector.js';
import { fetchIssues } from './resources/issues.actions.js';
import Issue from './components/Issues/Issue.js';
import Header from './components/Headers/header.js';
import IssuesHeader from './components/Headers/IssuesHeader.js';
import Pageheader from './components/Headers/Pageheader.js';
import Navigation from './components/Navigation/Navigation.js';
import Issues from './components/Issues/Issues.js';
import Description from './components/Issues/Description.js';
import './App.css';
import './main.css';

class App extends React.Component {
  static propsTypes = {
    fetchIssues: PropTypes.func.isRequired,
    issues: PropTypes.array.isRequired,
  }

  componentDidMount = () => {
    this.props.fetchIssues();
  }

  render() {
    const issues = this.props.issues.map(issue => <Issue key={issue.id} issue={issue} />);

    return (
      <div>
          <Header />
          <main className="content">
            <Pageheader count={"4"}/>
            <div className="container">
              <div className="issues-listing">
              </div>
            </div>
          </main>
      </div>
    );
  }
}

export default connect(state => ({
  issues: fromStore.getIssues(state),
}), {
  fetchIssues,
})(App);

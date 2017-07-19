import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import fromStore from '../resources/issues.selector.js';
import { fetchIssues } from '../resources/issues.actions.js';
import IssuesHeader from './Headers/IssuesHeader.js';
import Pageheader from './Headers/Pageheader.js';
import Navigation from './Navigation/Navigation.js';
import Issues from './Issues/Issues.js';
import Description from './Issues/Description.js';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import '../main.css';

class Body extends React.Component {
  static propsTypes = {
    fetchIssues: PropTypes.func.isRequired,
    issues: PropTypes.array.isRequired,
  }

  componentDidMount = () => {
    this.props.fetchIssues();
  }

  render() {
    const issues = this.props.issues;
    return (
      <Router>
        <main className="content">
          <Pageheader />
          <div className="container">
            <div className="issues-listing">
              <Navigation />
              <IssuesHeader />
              <Route exact path="/" render={ () =>  <Issues /> }/>
              <Route path="/:id" render={ (props) =>  <Description issues = { issues } id = { props.match.params.id } /> }/>
            </div>
          </div>
        </main>
      </Router>
    );
  }
}

export default connect(state => ({
    issues: fromStore.getIssues(state),
}), {
    fetchIssues,
})(Body);

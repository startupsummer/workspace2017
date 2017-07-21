import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import fromIssues from 'resources/issues/issues.selectors';
import {fetchIssuesList} from 'resources/issues/issues.actions';

import Logo from 'components/logo/logo';
import Repohead from './components/repohead/repohead';
import Reponav from './components/reponav/reponav';
import IssuesListing from './components/issues-listing/issues-listing';
import IssuePage from './components/issue-page/issue-page';

class App extends Component {
  componentDidMount() {
    this.props.fetchIssuesList();
  }

  render() {
    const {issuesList} = this.props;
    const amtOpenIssues = issuesList
      .filter(item => item.state === 'open')
      .length;

    return (
      <div className="app">
        <header className="header">
          <div className="container">
            <Logo />
          </div>
        </header>
        <Router>

          <main className="content">

            <section className="pagehead">
              <div className="container">
                <Repohead />
                <Reponav amtOpenIssues={amtOpenIssues} />
              </div>
            </section>

            <div className="container">
              <Route exact path="/" component={IssuesListing} />
              <Route exact path="/:id" component={props =>
                <IssuePage issuesList={issuesList} id={props.match.params.id} />
              }/>
            </div>

          </main>
        </Router>
      </div>
    );
  }
}

App.propsTypes = {
  fetchIssuesList: PropTypes.func.isRequired,
  issuesList: PropTypes.array.isRequired
}

export default connect(
  state => ({issuesList: fromIssues.getIssuesList(state)}),
  {fetchIssuesList}
)(App);

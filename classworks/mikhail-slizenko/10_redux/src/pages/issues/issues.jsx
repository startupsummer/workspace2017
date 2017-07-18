import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import fromStore from 'index.selectors';
import { fetchIssuesList } from 'resources/issues/issues.actions';

import Logo from 'components/logo/logo';
import Repohead from './components/repohead/repohead';
import Reponav from './components/reponav/reponav';
import IssuesListing from './components/issues-listing/issues-listing';
import IssuePage from './components/issue-page/issue-page';

class App extends Component {
  static propsTypes = {
    fetchIssuesList: PropTypes.func.isRequired,
    issuesList: PropTypes.array.isRequired
  }

  componentDidMount() {
    this.props.fetchIssuesList();
  }

  render() {
    const { issuesList } = this.props;
    const amtOpenIssues = issuesList.filter(i => i.state === 'open' && i).length;

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
                <Reponav amtOpenIssues={ amtOpenIssues } />
              </div>
            </section>

            <div className="container">

              <Route exact path="/" render={ () =>
                <IssuesListing />
              }/>

              <Route exact path="/:id" render={ props => 
                <IssuePage issuesList={ issuesList } id={ props.match.params.id } />
              }/>

            </div>
          </main>
        </Router>
      </div>
    );
  }
}

export default connect(
  state => ({issuesList: fromStore.getIssuesList(state)}),
  {fetchIssuesList}
)(App);

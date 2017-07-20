import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import AddIssue from './components/IssuesListNav/AddIssue';
import Header from './components/Header/Header';
import IssuesListContainer from './components/IssuesList/IssuesListContainer';
import IssuesListHeader from './components/IssuesList/IssuesListHeader';
import SearchIssue from './components/IssuesListNav/SearchIssue';
import IssueDescription from './components/Issue/IssueDescription';
import { fetchIssues } from '../../resources/issuesList/issues.actions';

class App extends Component {
  componentDidMount() {
    this.props.fetchIssues();
  }
  render() {
    return (
      <div>
        <Header />
        <main className="content">
          <div className="container">
            <div className="issues-listing">
              <div className="issues-listing__subnav">
                <div className="subnav">
                  <SearchIssue />
                  <AddIssue />
                </div>
              </div>
              <IssuesListHeader />
            </div>
            <Route exact path="/" component={IssuesListContainer} />
            <Route path="/:id" component={IssueDescription} />
          </div>
        </main>
      </div>
    );
  }
}

export default connect(state => ({
  issues: state.issues,
}), {
  fetchIssues,
})(App);

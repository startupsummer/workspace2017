import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';


import IssuesNav from './components/IssuesNav';
import IssuesHeader from './components/IssuesHeader';
import IssuesList from './components/IssuesList';


class Issues extends Component {
  constructor(props) {
    super(props);
    this.state = { tab: 'open', query: '' };
  }

  setTab = (tab) => this.setState({ tab });

  setQuery = (event) =>
    this.setState({ query: event.target.value });

  render() {
    const { tab, query } = this.state;
    return (
      <div className="container">
        <div className="issues-listing">

          <IssuesNav setQuery={this.setQuery} />

          <IssuesHeader tab={ tab } setTab={this.setTab} />

          <IssuesList tab={ tab } query={query} />

        </div>
      </div>);
  }
}

Issues.propTypes = {};

export default Issues;

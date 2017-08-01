import React, { Component } from 'react';
import PropTypes from 'prop-types';

import IssuesListeningSubnav from './IssuesListeningSubnav';
import IssuesListeningHeader from './IssuesListeningHeader';
import IssuesListeningBody from './IssuesListeningBody';
import { connect } from 'react-redux';
import { fetchIssues } from '../resources/issue/issue.actions';

class IssuesList extends Component {

  static propTypes = {
    fetchIssues: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      issuesType: 'open',
      dicription: '',
    };
  }

  componentDidMount() {
    this.props.fetchIssues();
  }

  onTabSwitch = newState => {
    this.setState({
      issuesType: newState
    });
  }

  onSearch = e => {
    this.setState({
      text: e.target.value
    });
  }


  render() {
    return (
      <div className="issues-listing">
        <IssuesListeningSubnav onSearch={this.onSearch} />
        <IssuesListeningHeader onTabSwitch={this.onTabSwitch} />
        <IssuesListeningBody issuesType={this.state.issuesType} text={this.state.text} />
      </div>
    )
  }
}

export default connect(null, {
  fetchIssues
})(IssuesList);

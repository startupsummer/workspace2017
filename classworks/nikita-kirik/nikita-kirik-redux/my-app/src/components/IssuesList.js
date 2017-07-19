import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import IssuesListeningSubnav from './IssuesListeningSubnav';
import IssuesListeningHeader from './IssuesListeningHeader';
import IssuesListeningBody from './IssuesListeningBody';
import IssueDiscription from './IssueDiscription';
import data from '../data.js';

import { fetchIssues } from '../resources/issue/issue.actions'
import issuesSelector from '../resources/issue/issue.selectors';


class IssuesList extends Component {

  static propTypes = {
    data: React.PropTypes.array.isRequired,
    fetchIssues: React.PropTypes.func.isRequired,
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
    let openCounter = this.props.data.filter(
      (curr) => curr.state === 'open'
    ).length;
    let closeCounter = this.props.data.filter(
      (curr) => curr.state === 'closed'
    ).length;

    return (
      <div className="issues-listing">
        <IssuesListeningSubnav onSearch={this.onSearch}/>
        <IssuesListeningHeader onTabSwitch={this.onTabSwitch} closeCounter={closeCounter} openCounter={openCounter}/>
        <IssuesListeningBody issuesType={this.state.issuesType} text={this.state.text} data={this.props.data} />

        <Route path="/discription/:id" render={props => (
            <IssueDiscription {...props} data={this.props.data}/>
          )}/>
        </div>
      )
    }
  }

  export default connect((state, props) => ({
    data: issuesSelector(state),
  }), {
    fetchIssues
  })(IssuesList);

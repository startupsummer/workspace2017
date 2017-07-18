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

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      data: [],
      issuesType: 'open',
      dicription: '',
    };
  }


  componentDidMount() {
    this.props.fetchIssues();
  }

  onIssueToogle = id => {
    const currData = this.props.data;
    let IssueInd;
    let newState;

    currData.forEach((it, ind) => {
      it.id === id ? (function() {
        IssueInd = currData.length - ind;
        newState = (it.state == 'open') ? 'closed' : 'open';
      })(): null;
    });

    fetch(
      `https://api.github.com/repos/SuperKirik/Issues-for-react-introduct-2/issues/${IssueInd}?state=all&access_token=4d2165c72dc4242333e9ffafe6cf3342f1644241`,
      {
        method: "PATCH",
        body: JSON.stringify({ state: newState, })
      }
    )
    .then(response  => response.json())
    .then(
      data => this.setState(
        {
          data: currData.map(it => it.id === id ? {...it, state: newState} : it),
        }
      ));
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
          <IssuesListeningBody issuesType={this.state.issuesType} text={this.state.text} data={this.props.data} onIssueToogle={this.onIssueToogle} />

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

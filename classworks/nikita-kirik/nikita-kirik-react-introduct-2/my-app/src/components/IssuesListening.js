import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import IssuesListeningSubnav from './IssuesListeningSubnav';
import IssuesListeningHeader from './IssuesListeningHeader';
import IssuesListeningBody from './IssuesListeningBody';
import IssueDiscription from './IssueDiscription';
import data from '../data.js'

class IssuesListening extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      data: data,
      issuesType: 'open',
      selectedId: null,
      dicription: '',
    };
  }

  onIssueToogle = id => {
    this.setState({
      data: this.state.data.map(
        it => it.id === id ? { ...it, state: it.state === 'open' ? 'closed' : 'open'} : it)
      });
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

    onIssueAdd = e => {
      this.setState({
        data: [...this.state.data, {
          "id": Math.random()*1000,
          "title": "Totally NEW !",
          "state": "open",
        }],
      });
    }

    onIssueClick = e => {
      this.setState({
        dicription: e.target.value,
      });
    }

    componentDidMount() {
      fetch(
        'https://github.com/SuperKirik/Issues-for-react-introduct/blob/master/data.js?access_token=634d20247dafb56443be3827738373c18c467e97', {
        method: 'GET',
        mode: 'no-cors',
        }
      ).then(response => response.json())
      .then(data => console.log(data));

    }

    render() {
      let openCounter = this.state.data.filter((curr) => curr.state === 'open').length;
      let closeCounter = this.state.data.filter((curr) => curr.state === 'closed').length;

      return (
        <div className="issues-listing">
          <IssuesListeningSubnav onSearch={this.onSearch} onIssueAdd={this.onIssueAdd}/>
          <IssuesListeningHeader onTabSwitch={this.onTabSwitch} closeCounter={closeCounter} openCounter={openCounter}/>
          <IssuesListeningBody issuesType={this.state.issuesType} text={this.state.text} issuesState={this.state} onIssueToogle={this.onIssueToogle} />

          <Route path="/discription/:id" render={props => (
              <IssueDiscription {...props} data={this.state.data}/>
            )}/>

          </div>
        )
      }
    }

    export default IssuesListening;

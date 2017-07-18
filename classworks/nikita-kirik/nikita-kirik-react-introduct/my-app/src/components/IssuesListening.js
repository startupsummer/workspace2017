import React, { Component } from 'react';
import IssuesListeningSubnav from './IssuesListeningSubnav';
import IssuesListeningHeader from './IssuesListeningHeader';
import IssuesListeningBody from './IssuesListeningBody';
import data from '../data.js'

class IssuesListening extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      data: data,
      issuesType: 'open'
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

    render() {
      let openCounter = this.state.data.filter((curr) => curr.state === 'open').length;
      let closeCounter = this.state.data.filter((curr) => curr.state === 'closed').length;

      return (
        <div className="issues-listing">
          <IssuesListeningSubnav onSearch={this.onSearch} onIssueAdd={this.onIssueAdd}/>
          <IssuesListeningHeader onTabSwitch={this.onTabSwitch} closeCounter={closeCounter} openCounter={openCounter}/>
          <IssuesListeningBody issuesType={this.state.issuesType} text={this.state.text} issuesState={this.state} onIssueToogle={this.onIssueToogle} />
        </div>
      )
    }
  }

  export default IssuesListening;

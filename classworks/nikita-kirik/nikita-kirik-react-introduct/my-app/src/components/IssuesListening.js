import React, { Component } from 'react';
import IssuesListeningSubnav from './IssuesListeningSubnav';
import IssuesListeningHeader from './IssuesListeningHeader';
import IssuesListeningBody from './IssuesListeningBody';

import data from '../data.js'

class IssuesListening extends Component {

  constructor(props) {
     super(props);
     this.state = {
       data: data,
       issuesType: 'open'
     };

   }

  changeState = newState => this.setState(newState);

  onIssueToogle = id => {
    this.setState({
      data: this.state.data.map(it => it.id === id ? { ...it, state: 'close' } : it)
    });
  }

  onTabSwitch = () => {
    this.setState({
      issuesType: this.state.issuesType === 'open' ? 'closed' : 'open'
    });
  }

  render() {

    return (
      <div className="issues-listing">
        <IssuesListeningSubnav/>
        <IssuesListeningHeader onTabSwitch={this.onTabSwitch}/>
        <IssuesListeningBody issuesType={this.state.issuesType} issuesState={this.state} onIssueToogle={this.onIssueToogle} />
        </div>
  )
  }
}

export default IssuesListening;

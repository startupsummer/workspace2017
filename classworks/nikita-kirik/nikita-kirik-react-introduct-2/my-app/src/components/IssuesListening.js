import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import IssuesListeningSubnav from './IssuesListeningSubnav';
import IssuesListeningHeader from './IssuesListeningHeader';
import IssuesListeningBody from './IssuesListeningBody';
import IssueDiscription from './IssueDiscription';
import data from '../data.js';

class IssuesListening extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      data: [],
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

    let numberOfIssue = 1;

    this.state.data.forEach((it, ind) => {
      it.id === id ? numberOfIssue = this.state.data.length - ind : null;
    });

    // numberOfIssue = 22;

    fetch(`https://api.github.com/repos/SuperKirik/Issues-for-react-introduct/issues/${numberOfIssue}?state=all&access_token=4d2165c72dc4242333e9ffafe6cf3342f1644241`, {
      method: "PATCH",
      body: JSON.stringify({
        state: "closed",
      })
    })


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

    fetch('https://api.github.com/repos/SuperKirik/Issues-for-react-introduct/issues?state=all&access_token=4d2165c72dc4242333e9ffafe6cf3342f1644241', {
      method: "POST",
      body: JSON.stringify({
        id: Math.random()*1000,
        body: "",
        title: 'Totally New 3!',
        state: "open",
      })
    })
    .then(response  => response.json())
    .then(
      data =>
      this.setState({
        data: [data, ...this.state.data]
      })
    );

  }

  onIssueClick = e => {
    this.setState({
      dicription: e.target.value,
    });
  }

  componentDidMount() {
    this.getDataToState();
  }

  getDataToState = () => {
    fetch(
      'https://api.github.com/repos/SuperKirik/Issues-for-react-introduct/issues?state=all&access_token=4d2165c72dc4242333e9ffafe6cf3342f1644241'
    )
    .then(response => response.json())
    .then(data => {
      const newData = data.map(it => {
        return { id: it.id, title: it.title, state: it.state }
      });
      this.setState({
        data: newData,
      });
    })
    .catch(console.log);

  }

  render() {

    console.log('state ',  this.state);
    let openCounter = this.state.data.filter(
      (curr) => curr.state === 'open'
    ).length;

    let closeCounter = this.state.data.filter(
      (curr) => curr.state === 'closed'
    ).length;

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

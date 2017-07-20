import React, { Component } from 'react';

import Header from './components/header/index';
import Main from './components/main/index';

import data from './data';
import addData from './addData';

const ACCESS_TOKEN = 'access_token=15565f636cf3a818858158b85e87d9d1cbb5a639';

class App extends Component {
  constructor() {
    super();
    this.state = {
      issues: data,
      issuesState: 'open',
      searchField: '',
    };
  }

chengedIssues = (id) => () => {
  const issuesState = this.state.issuesState;
  const chengeState = issuesState === 'open' ? 'closed' : 'open';
  let newState = this.state.issues.map(el => {
    const issuesNumber = el.number;
    const url = `https://api.github.com/repos/Oliferchik/newPublickRepo/issues/${issuesNumber}?${ACCESS_TOKEN}`;

    if(el.id === id) {
      fetch(url, {
        method: 'PATCH',
        body:JSON.stringify({
          state: chengeState,
        }),
      });
      return Object.assign({}, el, {
        state: chengeState
      });
    }
    return el;
  });
  this.setState({ issues: newState });
}

addIssues = () => () => {
  if(addData.length) {
    const issues = this.state.issues;
    const newData = addData.pop();
    const newState  = [...issues,newData];
    const url = `https://api.github.com/repos/Oliferchik/newPublickRepo/issues?${ACCESS_TOKEN}`

    fetch(url, {
      method: 'post',
      body:JSON.stringify({
        "title": newData.title,
        "body": newData.about,
        "state": this.state.issuesState,
      }),
    })
    .then(response => response.json())
    .then(data => console.log(data));

    this.setState({ issues: newState });
  }
}

stateOpen = () => {
  this.setState({ issuesState: 'open' });
}

event = () => (
  this.state.issuesState === 'open'
    ? this.stateOpen
    : this.stateClosed
)
stateClosed = () => {
  this.setState({ issuesState: 'closed' });
}



search = (e) => {
  const value = e.target.value;
  this.setState({searchField: value})
}
  componentDidMount() {
    fetch(`https://api.github.com/repos/Oliferchik/newPublickRepo/issues?state=all&${ACCESS_TOKEN}`)
      .then(response => response.json())
      .then(data => {
        const newState = data.reduce( (prev, cur) => {
          return prev.concat({
            id: cur.id,
            about: cur.body,
            state: cur.state,
            title: cur.title,
            number: cur.number,
          })
          }, []);
          this.setState({ issues: newState });
        }
      )
  }
  render() {
    return (
      <div>
        <Header />
        <Main
          issues={this.state.issues}
          chengedIssues={this.chengedIssues}
          addIssues={this.addIssues}
          issuesState={this.state.issuesState}
          stateOpen={this.stateOpen}
          stateClosed={this.stateClosed}
          search={this.search}
          searchField={this.state.searchField}
          />
      </div>
    );
  }
}

export default App;

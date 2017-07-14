import React, { Component } from 'react';

import Header from './components/header/index';
import Main from './components/main/index';

import data from './data';
import addData from './addData';



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
  const chengeState = issuesState === 'open' ? 'closed' : 'open';
  const issuesState = this.state.issuesState;
  let newState = this.state.issues.map(el => {
    if(el.id === id) {

      fetch('https://api.github.com/repos/Oliferchik/newPublickRepo/issues?access_token=15565f636cf3a818858158b85e87d9d1cbb5a639', {
        method: 'post',
        body:JSON.stringify({chengeState}),
      })

      .then(response => response.json())
      .then(data => console.log(data));
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

    fetch('https://api.github.com/repos/Oliferchik/newPublickRepo/issues?access_token=15565f636cf3a818858158b85e87d9d1cbb5a639', {
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
    fetch('https://api.github.com/repos/Oliferchik/newPublickRepo/issues?state=all&access_token=15565f636cf3a818858158b85e87d9d1cbb5a639')
      .then(response => response.json())
      .then(data => {
        const newState = data.reduce( (prev, cur) => {
          return prev.concat({
            id: cur.id,
            about: cur.body,
            state: cur.state,
            title: cur.title
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

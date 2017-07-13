import React, { Component } from 'react';
import './components/main.css';
import Header from './components/Header'
import PageHead from './components/PageHead'
import ListSubnav from './components/listing/ListSubnav';
import ListHeader from './components/listing/ListHeader';
import ListBody from './components/listing/ListBody';
import data from './data';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: data,
      issuesAll: data,
      stateShow: 'all',
    }
  }
  newOnClick= () => {

    let newIssue = this.state.issuesAll;
    newIssue.push({
      "id" : Math.random() * (1000000000 - 100000000) + 100000000,
      "title" : "New Issue!",
      "state": "closed",
    });
    this.setState({ issues:newIssue, issuesAll:newIssue })
    this.show(this.state.stateShow)();
  }

  closeOnClick = (item) => () => {
    let stateItem = item.state;
    let issues = this.state.issuesAll.map((itemIssues)=> {
      if(itemIssues.id === item.id) {
        if(stateItem === 'open')
          itemIssues.state = 'closed';
        else
          itemIssues.state = 'open';
      }
      return itemIssues;
    });
    this.setState({ issuesAll:issues });
    this.show(this.state.stateShow)();
  }
  count() {
    let close = 0, open = 0;
    open = this.state.issues.reduce(
      (previousValue, currentValue, index, array)=> {
      if(currentValue.state === 'open')
        return previousValue + 1;
      return previousValue;
    }, 0);
    close = this.state.issuesAll.length - open;
    return {
      open,
      close,
    }
  }
  inputChange = (event) => {
      const value = event.currentTarget.value.toLowerCase();
      let newIssue = this.state.issuesAll.filter((item) => item.title.toLowerCase().indexOf(value) !== -1);
      this.setState({issues:newIssue});
  }

  show = (state)=> () => {
    let issues;

    if(state !== 'all')  {
      issues = this.state.issuesAll.filter((item) => item.state === state);
      this.setState({issues, stateShow: state});
    }
    else {
      this.setState({issues: this.state.issuesAll, stateShow: state});
    }

  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Header />
        </div>
        <div className="content">
          <PageHead count={this.state.issuesAll.length}/>
          <div className="container">
            <div className="issues-listing">
              <ListSubnav onClick={this.newOnClick} onChange={this.inputChange}/>
              <ListHeader count={this.count()} show={this.show} state={this.state.stateShow}/>
              <ListBody data={this.state.issues} onClick={this.closeOnClick}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

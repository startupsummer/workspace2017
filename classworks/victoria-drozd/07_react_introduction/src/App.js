import React, { Component } from 'react';
import './App.css';
import Pagehead from './Pagehead';
import Container from './Container';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {issuesNum: props.data.length};
    this.handleAddNewIssue = this.handleAddNewIssue.bind(this);
  }

  handleAddNewIssue() {
    this.setState((prevState) => ({issuesNum: ++prevState.issuesNum}));
  }

  countIssues(data, shouldBeDisplayed) {
    let openIssuesCounter = 0, closedIssuesCounter = 0;
    for (let i = 0; i < data.length; i++) {
      if(shouldBeDisplayed[i] === 1) {
        if (data[i].state === 'open') {
          openIssuesCounter++;
        } else {
          closedIssuesCounter++;
        }
      }
    }
    return [openIssuesCounter, closedIssuesCounter];
  }

  displayAll(data) {
    let showedData = [];
    for (let i = 0; i < data.length; i++) {
      showedData.push(1);
    }
    return showedData;
  }

  render() {
    let showedData = this.displayAll(this.props.data);
    let [openIssuesCounter, closedIssuesCounter] = this.countIssues(this.props.data, showedData);

    return (
    <div>
      <Pagehead issuesNum={this.state.issuesNum} />
      <Container
        data={this.props.data}
        handleAddNewIssue={this.handleAddNewIssue}
        openIssuesNum={openIssuesCounter}
        closedIssuesNum={closedIssuesCounter}
        countIssues={this.countIssues}
        shouldBeDisplayed={showedData}
        displayAll={this.displayAll} />
    </div>
    );
  }
}

export default App;

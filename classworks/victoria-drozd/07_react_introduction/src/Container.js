import React, { Component } from 'react';
import Subnav from './Subnav';
import Header from './Header';
import Body from './Body';

export default class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 'open',
      data: props.data,
      shouldBeDisplayed: props.shouldBeDisplayed,
      openIssuesNum: props.openIssuesNum,
      closedIssuesNum: props.closedIssuesNum,
    };
    this.handleShowOpenTab = this.handleShowOpenTab.bind(this);
    this.handleShowClosedTab = this.handleShowClosedTab.bind(this);
    this.handleAddNewIssue = this.handleAddNewIssue.bind(this);
    this.handleCloseIssue = this.handleCloseIssue.bind(this);
    this.handleSearchText = this.handleSearchText.bind(this);
  }

  handleShowOpenTab() {
    this.setState({currentTab: 'open'});
  }

  handleShowClosedTab() {
    this.setState({currentTab: 'closed'});
  }

  handleAddNewIssue() {
    this.setState((prevState) => {
      let newData = prevState.data,
        newId = newData[newData.length - 1].id + 1;
      newData.push({
        "id": newId,
        "title": "New issue",
        "state": "open",
      });
      let newShouldBeDisplayed = this.props.displayAll(newData);
      let [openIssuesCounter, closedIssuesCounter] = this.props.countIssues(prevState.data, newShouldBeDisplayed);
      return {
        currentTab: 'open',
        data: newData,
        shouldBeDisplayed: newShouldBeDisplayed,
        openIssuesNum: openIssuesCounter,
        closedIssuesNum: closedIssuesCounter
      };
    });
    this.props.handleAddNewIssue();
  }

  handleCloseIssue(index) {
    this.setState((prevState) => {
      let newData = prevState.data, newShouldBeDisplayed = prevState.shouldBeDisplayed;
      let deletedElement = newData.splice(index, 1)[0];
      let deletedIdent = newShouldBeDisplayed.splice(index, 1)[0];
      deletedElement.id = newData[newData.length - 1].id + 1;
      deletedElement.state = 'closed';
      newData.push(deletedElement);
      newShouldBeDisplayed.push(deletedIdent);
      let [openIssuesCounter, closedIssuesCounter] = this.props.countIssues(prevState.data, newShouldBeDisplayed);
      return {
        data: newData,
        shouldBeDisplayed: newShouldBeDisplayed,
        openIssuesNum: openIssuesCounter,
        closedIssuesNum: closedIssuesCounter
      };
    });
  }

  handleSearchText(text) {
    this.setState((prevState) => {
      let dataCopy = prevState.data, newShouldBeDisplayed = [];
      for (let i = 0; i < dataCopy.length; i++) {
        if (~dataCopy[i].title.toLowerCase().indexOf(text.toLowerCase())) {
          newShouldBeDisplayed.push(1);
        } else {
          newShouldBeDisplayed.push(0);
        }
      }
      let [openIssuesCounter, closedIssuesCounter] = this.props.countIssues(prevState.data, newShouldBeDisplayed);
      return {
        shouldBeDisplayed: newShouldBeDisplayed,
        openIssuesNum: openIssuesCounter,
        closedIssuesNum: closedIssuesCounter
      };
    });
  }

  render() {
    return (
      <div className="container">
        <div className="issues-listing">
          <Subnav onAddNewIssue={this.handleAddNewIssue} onSearchText={this.handleSearchText} />
          <Header
            currentTab={this.state.currentTab}
            openIssuesNum={this.state.openIssuesNum}
            closedIssuesNum={this.state.closedIssuesNum}
            onShowOpenTab={this.handleShowOpenTab}
            onShowClosedTab={this.handleShowClosedTab} />
          <Body
            currentTab={this.state.currentTab}
            data={this.state.data} onCloseIssue={this.handleCloseIssue}
            shouldBeDisplayed={this.state.shouldBeDisplayed} />
        </div>
      </div>
    );
  }
}

import React, { Component } from 'react';
import Header from './components/header.js';
import IssuesHeader from './components/IssuesHeader.js';
import Pageheader from './components/Pageheader.js';
import Navigation from './components/Navigation/Navigation.js';
import Issues from './components/Issues/Issues.js';
import data from './data.js';
import './App.css';
import './main.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: data,
      menuState : "open",
      searchText : ''
    };

    this.handleOpenButtonLinkClick = this.handleOpenButtonLinkClick.bind(this);
    this.handleClosedButtonLinkClick = this.handleClosedButtonLinkClick.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handlerCloseIssueClick = this.handlerCloseIssueClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(event) {
    this.setState({
      searchText : event.target.value.toLowerCase()
    });
  }

  handleOpenButtonLinkClick() {
    this.setState({
      menuState : "open"
    });
  }

  handleClosedButtonLinkClick() {
    this.setState({
      menuState : "closed"
    });
  }

  handleButtonClick() {
    let newIssue =
    {
      "id": this.state.issues[this.state.issues.length - 1].id + 1,
      "title": "New Issue",
      "state": "open",
    };

    let newIssues = [...this.state.issues, newIssue];

    this.setState({
        issues: newIssues,
        menuState : "open",
    });
  }

  handlerCloseIssueClick(issue) {
    let newIssues = Object.assign([], this.state.issues);
    newIssues.map((item) => {
      if (item === issue) {
        item.state = "closed";
      };
    });

    this.setState({
      issues : newIssues,
    });
  }

  render() {
    const filteredIssues = this.state.issues.filter(issue => issue.title.toLowerCase().startsWith(this.state.searchText));
    return (
      <div>
        <Header />
        <main className="content">
          <Pageheader count={this.state.issues.length} />
          <div className="container">
            <div className="issues-listing">
              <Navigation onSearchChange={this.handleSearch} onButtonClick={this.handleButtonClick} />
              <IssuesHeader onOpenClick={this.handleOpenButtonLinkClick}
                onCloseClick={this.handleClosedButtonLinkClick}
                newIssues={filteredIssues}
                menuState={this.state.menuState}
              />
              <Issues issues={filteredIssues} menuState={this.state.menuState} onClick={this.handlerCloseIssueClick} />
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;

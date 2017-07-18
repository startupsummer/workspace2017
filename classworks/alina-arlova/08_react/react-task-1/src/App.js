import React, { Component } from 'react';
import Header from './components/Headers/header.js';
import IssuesHeader from './components/Headers/IssuesHeader.js';
import Pageheader from './components/Headers/Pageheader.js';
import Navigation from './components/Navigation/Navigation.js';
import Issues from './components/Issues/Issues.js';
import Description from './components/Issues/Description.js';
import data from './data.js';
import './App.css';
import './main.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: data,
      menuState : "open",
      searchText : ''
    };
  }

  handleSearch = (event) => {
    this.setState({
      searchText : event.target.value.toLowerCase()
    });
  }

  clickOpenButton = () => {
    this.setState({
      menuState : "open"
    });
  }

  clickClosedButton = () => {
    this.setState({
      menuState : "closed"
    });
  }

  createNewIssue = () => {
    let newIssue =
    {
      "id": this.state.issues[this.state.issues.length - 1].id + 1,
      "title": "New Issue",
      "state": "open",
      "description": "Issue description",
    };

    let newIssues = [...this.state.issues, newIssue];

    this.setState({
        issues: newIssues,
        menuState : "open",
    });
  }

  closeIssue = (issue) => {
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
      <Router>
        <div>
          <Header />
          <main className="content">
            <Pageheader count={this.state.issues.length} />
            <div className="container">
              <div className="issues-listing">
                <Navigation onSearchChange={this.handleSearch} onButtonClick={this.createNewIssue} />
                <IssuesHeader onOpenClick={this.clickOpenButton}
                  onCloseClick={this.clickClosedButton}
                  newIssues={filteredIssues}
                  menuState={this.state.menuState}
                />
                <Route path="/:id" component={(props) =>
                  <Description issues={this.state.issues} {...props} />}
                />
                <Route exact path="/" component={() =>
                  <Issues issues={filteredIssues} menuState={this.state.menuState} onClick={this.closeIssue} /> }
                />
              </div>
            </div>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;

import React, { Component } from 'react';
import Header from './components/header.js';
import Pageheader from './components/Pageheader.js';
import SubnavSearch from './components/SubnavSearch.js';
import Button from './components/Buttons/Button.js';
import ButtonLink from './components/Buttons/ButtonLink.js';
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
    this.checkActivePage = this.checkActivePage.bind(this);
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
    this.state.issues.push(newIssue);

    this.setState({
      menuState : "open"
    });
  }

  handlerCloseIssueClick(issue) {
    let newIssues = this.state.issues;
    newIssues.map((item) => {
      if (item === issue) {
        item.state = "closed";
      };
    });

    this.setState({
      issues : newIssues
    });
  }

  checkActivePage(state) {
    if (this.state.menuState === state) {
      return " btn-link--selected";
    } else {
      return "";
    };
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
              <div className="issues-listing__subnav">
                <div className="subnav">
                  <SubnavSearch onChange={this.handleSearch} />
                  <Button text='New issue' className='btn-primary' onClick={this.handleButtonClick} />
                </div>
              </div>
              <div className="issues-listing__header">
                <div className="issues-listing__states">
                  <ButtonLink
                    className={this.checkActivePage("open")}
                    svgClassName="open"
                    text="Open"
                    count={filteredIssues.filter((item) => { if (item.state === "open") return true;}).length}
                    onClick={this.handleOpenButtonLinkClick}
                  />
                  <ButtonLink
                    className={this.checkActivePage("closed")}
                    svgClassName="closed"
                    text="Close"
                    count={filteredIssues.filter((item) => { if (item.state === "closed") return true;}).length}
                    onClick={this.handleClosedButtonLinkClick} />
                </div>
              </div>
              <div className="issues-listing__body">
                <Issues issues={filteredIssues} menuState={this.state.menuState} onClick={this.handlerCloseIssueClick} />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;

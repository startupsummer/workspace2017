import React, { Component } from 'react';
import data from './data';
import Header from './Header/Header';
import IssuesListContainer from './IssuesList/IssuesListContainer';
import IssuesListHeader from './IssuesList/IssuesListHeader';
import SearchIssue from './IssuesListNav/SearchIssue';
import AddIssue from './IssuesListNav/AddIssue';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: data,
      issuesState: "open",
      filterIssues: '',
    }    
  }
  handleState(e) {
    this.setState({issuesState: e.target.value})
  }
  handleCloseIssue(id, e) {
    const {issues} = this.state;
    const newIssuesList = issues.map((item) => {
      if (item.id === id) 
      return Object.assign(item, {state: 'closed'});
      return item;
    })
    this.setState({issues: newIssuesList});
  }
  handleNewIssue() {
    const {issues} = this.state;
    const id = Math.random();
    const newIssue = {
      "id": id,
      "title": id,
      "state": "open",
    };
    const newIssuesList = [...issues, newIssue];
    this.setState({issues: newIssuesList});
  }
  handleSearch(e) {
    this.setState({filterIssues: e.target.value});
  }
  render() {
    const {issues, issuesState, filterIssues} = this.state;
    console.log(issues);
    const displayedIssues = issues.filter((item) => item.title.toString().toLowerCase().includes(filterIssues));
    return (
      <div>
        <Header count={issues.length}/>
        <main className="content">
          <div className="container">
            <div className="issues-listing">
              <div className="issues-listing__subnav">
                <div className="subnav">
                  <SearchIssue handleSearch={this.handleSearch.bind(this)} />
                  <AddIssue handleNewIssue={this.handleNewIssue.bind(this)} />
                </div>
              </div>
              <IssuesListHeader issues={issues} handleIssueState={this.handleState.bind(this)}/>
              <IssuesListContainer issues={displayedIssues} issuesState={issuesState} handleCloseIssue={this.handleCloseIssue.bind(this)}/>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;

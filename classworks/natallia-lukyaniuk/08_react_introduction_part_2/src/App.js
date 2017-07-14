import React, { Component } from 'react';
import data from './data';
import Header from './Header/Header';
import IssuesListContainer from './IssuesList/IssuesListContainer';
import IssuesListHeader from './IssuesList/IssuesListHeader';
import SearchIssue from './IssuesListNav/SearchIssue';
import AddIssue from './IssuesListNav/AddIssue';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import IssueDescription from './Issue/IssueDescription';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: [],
      issuesState: "open",
      filterIssues: '',
    }    
  }
  componentDidMount() {
    fetch('https://api.github.com/repos/natallia-lukyaniuk/githubApp/issues?access_token=a703c8d41fd00ac64c44bdbc1b987952ef5110de&state=all')
      .then(response => response.json())
      .then(data => {
        this.setState({issues: data});
      });
  }
  handleState(e) {
    this.setState({issuesState: e.target.value})
  }
  handleChangeState(number, e) {
    const {issues} = this.state;
    
    const issue = issues.filter((item) => item.number === number);
    const newIssue = Object.assign({}, {state: e.target.value});

    fetch(`https://api.github.com/repos/natallia-lukyaniuk/githubApp/issues/${number}?access_token=a703c8d41fd00ac64c44bdbc1b987952ef5110de`, {
      method: 'PATCH',
      body: JSON.stringify(newIssue)
    })
      .then(response => response.json())
      .then(data => {
        const newIssuesList = issues.map((item) => {
          if (item.number === number) 
          return Object.assign(item, {state: data.state});
          return item;
        })
        this.setState({issues: newIssuesList});
      });
  }
  handleNewIssue() {
    const {issues} = this.state;
    const id = Math.random().toString();
    const newIssue = {
      "title": id,
      "body": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    };
    fetch('https://api.github.com/repos/natallia-lukyaniuk/githubApp/issues?access_token=a703c8d41fd00ac64c44bdbc1b987952ef5110de', {
      method: 'POST',
      body: JSON.stringify(newIssue)
    })
      .then(response => response.json())
      .then(data => {
        const newIssuesList = [...issues, data];
        this.setState({issues: newIssuesList});
      });
  }
  handleSearch(e) {
    this.setState({filterIssues: e.target.value});
  }
  render() {
    const {issues, issuesState, filterIssues} = this.state;
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
            </div>
            <Route exact path="/" component={() => <IssuesListContainer issues={displayedIssues} issuesState={issuesState} handleChangeState={this.handleChangeState.bind(this)}/>} />
            <Route path="/:id" component={(props) => <IssueDescription issues={issues} id={props.match.params.id} />} />
          </div>
        </main>
      </div>
    );
  }
}

export default App;

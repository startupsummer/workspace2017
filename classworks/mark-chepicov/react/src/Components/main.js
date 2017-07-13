import React, { Component } from 'react';
import '../main.css';
import Issues from './issues.js';
import SubNavigation from './subnav.js';
import Repo from './repo.js';
import data from './data.js';
import IssueItem from './issue-item.js';

class Main extends Component {
  constructor(props){
    super();
    this.state = {
      issues: data,
      tab: 'open',
      text: '',
    };
  }
  
  openState = (status) => () => {
    status !== this.state.tab ? this.setState({tab : status}) : this.state.tab;
  }

  closeIssue = (id) => () => {
    const array = this.state.issues.splice(0);
    array.find((item) => id === item.id).state = 'closed';
    this.setState({issues : array});
  }

  openIssue = (id) => () => {
    const array = this.state.issues.splice(0);
    array.find((item) => id === item.id).state = 'open';
    this.setState({issues : array});
  }

  newIssue = () => () =>{
    const array = this.state.issues.splice(0);
    let d = new Date();
    array.push({id: d.getTime(), title:"Lorem ipsum", state:"open"});
    this.setState({issues : array});
  }
  search = (event) => {
    console.log(123,event.target.value);
    this.setState({text: event.target.value});
  }
  render() {
    return (
      <main className="content">
          <div className="pagehead">
            <Repo repname="startupsummer" taskname="react-task-1"/>
            <Issues counter={this.state.issues.length} />
          </div>
          <div className="container">
            <div className="issues-listing">
              <SubNavigation click={this.newIssue} search={this.search} />
              <div className="issues-listing__header">
                <div className="issues-listing__states">
                  <button className={`btn-link ${this.state.tab === 'open' ? 'btn-link--selected' : ''}`} type="button" onClick={this.openState("open")}>
                    <svg aria-hidden="true" className="octicon octicon-issue-opened" height="16" version="1.1" viewBox="0 0 14 16" width="14">
                      <path fill-rule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path>
                    </svg>
                    {this.state.issues.reduce((acc, issue) => (issue.state === "open" ? acc + 1 : acc), 0)} Open
                  </button>
                  <button className={`btn-link ${this.state.tab === "closed" ? "btn-link--selected" : ''}`} type="button" onClick={this.openState("closed")}>
                    <svg aria-hidden="true" className="octicon octicon-check" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path fill-rule="evenodd" d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5z"></path></svg>
                    {this.state.issues.reduce((acc, issue) => (issue.state === 'closed' ? acc + 1 : acc), 0)} Closed
                  </button>
                </div>
              </div>
              <div className="issues-listing__body">
                <ul className="issues">
                  {this.state.issues.filter((item) => this.state.tab === item.state).filter((item) => item.title.indexOf(this.state.text) !== -1).map((item) => <IssueItem state={item.state} title={item.title} 
                  issueId={item.id} openButton={this.openIssue} closeButton={this.closeIssue}/>)}
                </ul>
              </div>
            </div>
          </div>
      </main>
    );
  }
}
export default Main;
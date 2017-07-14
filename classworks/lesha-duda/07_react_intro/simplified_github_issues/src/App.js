import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './index.js';
import MyButton from './components/button';
import List from './components/list';
import Data from './data/data'
import Search from './components/search';


class App extends Component {

  constructor() {
    super();
    this.state = {
      issues: Data,
      st: 'open'
     }
     this.handlerAdd = this.handlerAdd.bind(this);
     this.handlerDel = this.handlerDel.bind(this);
     this.closeState = this.closeState.bind(this);
     this.openState = this.openState.bind(this);
     this.allState = this.allState.bind(this);
  }

  render() {
    let {issues} = this.state;
    let allIssuies = this.state.issues.length;
    let openedAmount = 0;

    this.state.issues.map(function(e) {
      if(e.state === 'open') {
        openedAmount += 1;
      }
    });

    let closedAmount = allIssuies - openedAmount;

    return (
      <div>
        <div className="pagehead">
          <div className="container">
            <nav className="reponav">
              <a href="#" className="reponav-item selected">
                <svg height="16" version="1.1" viewBox="0 0 14 16" width="14">
                  <path fillRule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path>
                </svg>
                <MyButton className="reponav-item.selected btn-link" value='Issues' handler={this.allState} number={allIssuies}/>
              </a>
            </nav>
          </div>
        </div>

        <div className="container">
          <div className="issues-listing">
            <div className="issues-listing__subnav">
              <div className="subnav">
                <Search/>
                <MyButton className="btn btn-primary" value='New issue' handler={this.handlerAdd}/>
              </div>
            </div>

            <div className="issues-listing__header">
              <div className="issues-listing__states">
                <svg aria-hidden="true" className="octicon octicon-issue-opened" height="16" version="1.1" viewBox="0 0 14 16" width="14">
                  <path fillRule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path>
                </svg>
                <MyButton className ="btn-link btn-link--selected" type="button" value='Open' handler={this.openState} number={openedAmount}/>

                <svg aria-hidden="true" className="octicon octicon-check" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path fillRule="evenodd" d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5z"></path></svg>
                <MyButton className="btn-link" type="button" value='Closed' handler={this.closeState} number={closedAmount}/>
              </div>
            </div>

            <div className="issues-listing__body">
              <List listData={issues} state={this.state.st} handler={this.handlerDel}/>
            </div>

          </div>
        </div>
      </div>
    );
  }

  handlerAdd(e) {
    e.preventDefault();
    let id = Math.floor(Math.random() * (1000000000000 )) + 1000000000000;

    this.setState({
      issues: this.state.issues.concat([
        {
          "id": id,
          "title": "Best way to load a folder of static files?",
          "state": "open",
        }
      ])
    })
  }

  handlerDel = (id) => (e) => {
    e.preventDefault();

    let tempIssues = this.state.issues;
    let newIssues = tempIssues.map(function(e) {
      if(e.id === id) {
        return Object.assign({}, e, {state: 'closed'});
      }
      return e;
    });
    this.setState({
        issues: newIssues,
    })
  }

  closeState(e) {
      e.preventDefault();
      this.setState({
        st: 'closed'
      })
  }

  openState(e) {
      e.preventDefault();
      this.setState({
        st: 'open'
      })
  }

  allState(e) {
      e.preventDefault();
      this.setState({
        st: 'all'
      })
  }
}

export default App;

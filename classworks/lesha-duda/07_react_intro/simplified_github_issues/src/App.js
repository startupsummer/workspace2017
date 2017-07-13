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

     this.handleSubmit = this.handleSubmit.bind(this);
     this.handleChange = this.handleChange.bind(this);
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
        {/* <Search handleSubmit={this.handleSubmit} onChange={this.handleChange}/> */}
        <MyButton value='All' handler={this.allState} number={allIssuies}/>
        <MyButton value='Open' handler={this.openState} number={openedAmount}/>
        <MyButton value='Closed' handler={this.closeState} number={closedAmount}/>
        <MyButton value='New issue' handler={this.handlerAdd}/>
        <List listData={issues} state={this.state.st} handler={this.handlerDel}/>
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

  // handleChange(event) {
  //   this.setState({value: event.target.value});
  // }
  //
  // handleSubmit(event) {
  //   alert('A name was submitted: ' + this.state.value);
  //   event.preventDefault();
  // }

}

export default App;

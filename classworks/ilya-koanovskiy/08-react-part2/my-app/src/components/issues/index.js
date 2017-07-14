import React, { Component } from 'react';
import Subnav from '../issuesSubnav/index.js';
import IssuesHeader from '../issuesHeader/index.js';
import IssuesList from '../issuesList/index.js';
import Description from '../issueDescription/index.js';
import data from '../../data.js';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Issues extends Component{
  constructor(props){
    super(props);
    const someIssues = [];
    this.state = {
      activeButton:"open",
      issues:[],
      someIssues: someIssues
    }
  }

  componentDidMount(){
    fetch('https://api.github.com/repos/i-kohan/lecture1/issues?access_token=2ba5b37a5778956ae94876fe027bb5257daade6e&state=all')
      .then(response => response.json())
      .then(data => {
        this.setState({issues:data,someIssues:data});
      });
  }

  changeIssues = (array) => {
    this.setState({issues:array,someIssues:array})
  }

  changeArray= ()=>{
    fetch('https://api.github.com/repos/i-kohan/lecture1/issues?access_token=2ba5b37a5778956ae94876fe027bb5257daade6e&state=all')
    .then(response => response.json())
    .then(data => {
        this.setState({issues:data,someIssues:data});
    });
  }

  changeActiveButton = (str) => {
    this.setState({activeButton : str});
  }


  render(){
    const issues = this.state.issues;
    return(
      <div className="container">
        <div className="issues-listing">
          <Subnav func={this.changeArray} info={this.state.issues} changeIssues={this.changeIssues}/>

          <IssuesHeader func={this.changeActiveButton}  info={this.state.someIssues} issues={this.state.someIssues}/>

          <Route path="/:id" component={(props) => <Description  items={this.state.someIssues} {...props}/>}/>
          
          <Route exact path="/" component={(props) => <IssuesList info={this.state.someIssues} button={this.state.activeButton} func={this.changeArray}/>}/>
        </div>
      </div>
    )
  }
}

export default Issues;
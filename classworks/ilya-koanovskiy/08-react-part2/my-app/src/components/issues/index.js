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
    this.state = {
      activeButton:"open",
      issues:[],
      valueOfInput : ''
    }
  }

  componentDidMount(){
    fetch('https://api.github.com/repos/i-kohan/test/issues?access_token=2ba5b37a5778956ae94876fe027bb5257daade6e&state=all')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({issues:data});
      });
  }

  changeIssues = (array) => {
    this.setState({issues:array})
  }

  changeArray= (data) => {
    const newIssues = [...this.state.issues,data];
    this.setState({issues:newIssues});
  }

  changeIssueInArray= (data) => {
    let newIssues = [...this.state.issues];
    newIssues.map(item => {
      if(item.id !== data.id)
        return true;
      item.state = data.state;
    });
    console.log(newIssues);
    this.setState({issues:newIssues});
  }

  changeActiveButton = (str) => {
    this.setState({activeButton : str});
  }

  getValueOfInput = (value) => {
    this.setState({valueOfInput : value});
  } 


  render(){
    const issues = this.state.issues;
    return(
      <div className="container">
        <div className="issues-listing">
          <Subnav func={this.changeArray} info={this.state.issues} changeIssues={this.getValueOfInput}/>

          <IssuesHeader func={this.changeActiveButton}  info={this.state.issues} input={this.state.valueOfInput}/>

          <Route path="/:id" component={(props) => <Description  items={this.state.issues} {...props}/>}/>
          
          <Route exact path="/" component={(props) => <IssuesList info={this.state.issues} input={this.state.valueOfInput} button={this.state.activeButton} func={this.changeIssueInArray}/>}/>
        </div>
      </div>
    )
  }
}

export default Issues;
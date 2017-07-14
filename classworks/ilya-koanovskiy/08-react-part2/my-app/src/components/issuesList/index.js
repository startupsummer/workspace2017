import React, { Component } from 'react';
import Button from '../button/index.js';
import Issue from '../singleIssue/index.js';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class IssuesList extends Component{

  createIssues = (issues) => {
    if(this.props.button == "all") return issues;
    return issues.filter((item)=>item.state == this.props.button);
  }

  handleClick = (number) => () => {

    fetch(`https://api.github.com/repos/i-kohan/lecture1/issues/${number}?access_token=2ba5b37a5778956ae94876fe027bb5257daade6e`,{
      method:"PATCH",
      body:JSON.stringify({
        state:"close"
      })
    })
    .then(response => response.json())
    .then(data => this.props.func())
    this.props.func();
  }


  render(){
    return(
      <div className="issues-listing__body">
        <ul className="issues">
          {
            this.createIssues(this.props.info).map((item)=>                
              <Issue issue={item} func={this.handleClick}/>
            )                                          
          }
        </ul>
      </div>
    ) 
  }
}

export default IssuesList;
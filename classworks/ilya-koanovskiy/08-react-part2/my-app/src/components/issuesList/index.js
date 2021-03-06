import React, { Component } from 'react';
import Button from '../button/index.js';
import Issue from '../singleIssue/index.js';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class IssuesList extends Component{

  inputArr = (issues,value) => {
    const newArr = issues.filter((item)=> item.title.toLowerCase().indexOf(value.toLowerCase())>-1);
    return newArr;
  }

  createIssues = (issues,value) => {
    const newArr = this.inputArr(issues,value); 
    if(this.props.button == "all") return newArr;
    return newArr.filter((item)=>item.state == this.props.button);
  }

  handleClick = (number) => () => {
    fetch(`https://api.github.com/repos/i-kohan/test/issues/${number}?access_token=2ba5b37a5778956ae94876fe027bb5257daade6e`,{
      method:"PATCH",
      body:JSON.stringify({
        state:"close"
      })
    })
    .then(response => response.json())
    .then(data => this.props.func(data))
  }


  render(){
    return(
      <div className="issues-listing__body">
        <ul className="issues">
          {
            this.createIssues(this.props.info,this.props.input).map((item)=>                
              <Issue issue={item} func={this.handleClick}/>
            )                                          
          }
        </ul>
      </div>
    ) 
  }
}

export default IssuesList;
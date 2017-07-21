import React, { Component } from 'react';
import Issue from '../singleIssue/index.js';
import { connect } from 'react-redux';
import { changeIssue } from '../../Resources/issues/issues.actions';
import select from '../../Resources/issues/issues.selectors';
import './index.css';

class IssuesList extends Component{

  inputArr = (issues,value) => {
    const newArr = issues.filter((item)=> item.title.toLowerCase().includes(value.toLowerCase()));
    return newArr;
  }

  createIssues = (issues,value) => {
    const newArr = this.inputArr(issues,value); 
    if(this.props.activeButton === "all") return newArr;
    return newArr.filter((item)=>item.state === this.props.activeButton);
  }

  handleClick = (number) => () =>{
    this.props.changeIssue(number);
  }


  render(){
    const newIssues = this.createIssues(this.props.issues,this.props.searchText).map((item)=>                
              <Issue key={item.id} issue={item} func={this.handleClick}/>);
    return(
      <div className="issues-listing__body">
        <ul className="issues">
          { newIssues }
        </ul>
      </div>
    ) 
  }
}

export default connect(state => ({
  issues : select.getIssues(state),
  activeButton : select.getIssuesState(state)
}), 
  {
  changeIssue,
})(IssuesList);

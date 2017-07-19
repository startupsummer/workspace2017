import React, { Component } from 'react';
import Issue from '../singleIssue/index.js';
import { connect } from 'react-redux';
import { changeIssue } from '../../Resources/issues/issues.actions';
import select from '../../Resources/issues/issues.selectors';

class IssuesList extends Component{

  inputArr = (issues,value) => {
    const newArr = issues.filter((item)=> item.title.toLowerCase().indexOf(value.toLowerCase())>-1);
    return newArr;
  }

  createIssues = (issues,value) => {
    const newArr = this.inputArr(issues,value); 
    if(this.props.activeButton === "all") return newArr;
    return newArr.filter((item)=>item.state === this.props.activeButton);
  }

  handleClick = (number) => () =>{
    console.log(number);
    this.props.changeIssue(number);
  }


  render(){
    return(
      <div className="issues-listing__body">
        <ul className="issues">
          {
            this.createIssues(this.props.issues,this.props.value).map((item)=>                
              <Issue issue={item} func={this.handleClick}/>
            )                                          
          }
        </ul>
      </div>
    ) 
  }
}

export default connect(state => ({
  issues : select.getIssues(state),
  activeButton : select.getIssuesState(state),
  value : select.getValue(state)
}), 
  {
  changeIssue,
})(IssuesList);
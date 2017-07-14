import React, { Component } from 'react';
import Subnav from '../issuesSubnav/index.js';
import IssuesHeader from '../issuesHeader/index.js';
import IssuesList from '../issuesList/index.js';
import data from '../../data.js';

class Issues extends Component{
    constructor(props){
        super(props);
        const someIssues = data;
        this.state = {
            activeButton:"open",
            issues:data,
            someIssues: someIssues
        }
    }

    changeIssues = (array) => {
        this.setState({issues:array,someIssues:array})
    }

    changeArray = (array) => {
        this.setState({someIssues:array})
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

                    <IssuesList info={this.state.someIssues} button={this.state.activeButton} func={this.changeArray}/>
                </div>
            </div>
        )
    }
}

export default Issues;
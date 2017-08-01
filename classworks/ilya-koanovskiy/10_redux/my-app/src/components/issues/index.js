import React, { Component } from 'react';
import Subnav from '../issuesSubnav/index.js';
import IssuesHeader from '../issuesHeader/index.js';
import IssuesList from '../issuesList/index.js';
import Description from '../issueDescription/index.js';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchIssues } from '../../Resources/issues/issues.actions'
import { withRouter } from 'react-router';
import './index.css';

class Issues extends Component{

  constructor(props) {
    super(props);
    this.state = {
      searchText : '',
    };
  }

  componentDidMount(){
    this.props.fetchIssues();
  }

  serchHandler = (searchText) => {
    this.setState({searchText});
  }

  render(){
    return(
      <div className="container">
        <div className="issues-listing">
          <Subnav searchText = {this.serchHandler}/>

          <IssuesHeader searchText = {this.state.searchText}/>

          <Route path="/:id" render={ (props) => <Description {...props}/>}/>
          
          <Route exact path="/" render={(props) => <IssuesList searchText = {this.state.searchText}/>}/>
        </div>
      </div>
    )
  }
}

  

export default withRouter(connect(null, {fetchIssues})(Issues));

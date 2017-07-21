import React, { Component } from 'react';
import Subnav from '../issuesSubnav/index.js';
import IssuesHeader from '../issuesHeader/index.js';
import IssuesList from '../issuesList/index.js';
import Description from '../issueDescription/index.js';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchIssues } from '../../Resources/issues/issues.actions'
import { withRouter } from 'react-router';

class Issues extends Component{

  componentDidMount(){
    this.props.fetchIssues();
  }

  render(){
    return(
      <div className="container">
        <div className="issues-listing">
          <Subnav/>

          <IssuesHeader/>

          <Route path="/:id" render={ (props) => <Description {...props}/>}/>
          
          <Route exact path="/" render={(props) => <IssuesList/>}/>
        </div>
      </div>
    )
  }
}

  

export default withRouter(connect(null, {fetchIssues})(Issues));

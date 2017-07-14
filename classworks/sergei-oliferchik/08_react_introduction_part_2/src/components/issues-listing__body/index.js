import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import IssuesItem from '../issues__item';
import AboutIssue from '../issues-about';

import './index.css';

const IssuesListingBody = (props) => (
  <div className="issues-listing__body">
    <Route exact path="/" component={() => (
      <ul className="issues">
          {
            props.issues
              .filter(el => (
                el.state === props.issuesState &&
                el.title.toLowerCase().indexOf(props.searchField.toLowerCase()) !== -1)
              )
              .map(el => <li key={`${el.id}  li`}><IssuesItem issues={el} chengedIssues={props.chengedIssues} key={el.id}/></li>)
          }
      </ul>
    )}/>
    <Route path="/:id" component={({match}) => <AboutIssue match={match} issues={props.issues}/>}/>
  </div>
);


IssuesListingBody.PropTypes = {
  issues: PropTypes.array,
  chengedIssues: PropTypes.func,
  issuesState: PropTypes.string,
  searchField: PropTypes.string,
};

export default IssuesListingBody;

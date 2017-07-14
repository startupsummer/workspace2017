import React from 'react';
import PropTypes from 'prop-types';

import Pagehead from './pagehead';
import IssuesListing from './issues-listing';

import './index.css';

const  Main  = (props) => (
  <main className='content'>
    <Pagehead issues={props.issues}/>
    <IssuesListing
      issues={props.issues}
      chengedIssues={props.chengedIssues}
      addIssues={props.addIssues}
      issuesState={props.issuesState}
      stateOpen={props.stateOpen}
      stateClosed={props.stateClosed}
      search={props.search}
      searchField={props.searchField}
      />
  </main>
);

Main.PropTypes = {
  issues: PropTypes.array,
  chengedIssues: PropTypes.func,
  addIssues: PropTypes.func,
  issuesState: PropTypes.string,
  stateOpen: PropTypes.func,
  stateClosed: PropTypes.func,
  search:  PropTypes.func,
  searchField: PropTypes.string,
}

export default Main;

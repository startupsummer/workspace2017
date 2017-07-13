import React from 'react';
import PropTypes from 'prop-types';

import Pagehead from '../pagehead/index';
import IssuesListing from '../issues-listing';

import './index.css';

const  Main  = (props) => (
  <main className='content'>
    <Pagehead issues={props.issues}/>
    <IssuesListing
      issues={props.issues}
      onDelete={props.onDelete}
      addIssues={props.addIssues}
      issuesState={props.issuesState}
      stateOpen={props.stateOpen}
      stateClosed={props.stateClosed}
      search={props.search}
      />
  </main>
);

Main.PropTypes = {
  issues: PropTypes.array,
  onDelete: PropTypes.func,
  addIssues: PropTypes.func,
  issuesState: PropTypes.string,
  stateOpen: PropTypes.func,
  stateClosed: PropTypes.func,
  search:  PropTypes.func,
}

export default Main;

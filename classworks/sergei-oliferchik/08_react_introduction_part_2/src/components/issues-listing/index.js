import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

import Subnav from '../subnav';
import IssuesListingHeader from '../issues-listing__header';
import IssuesListingBody from '../issues-listing__body';

const  IssuesListing  = (props) => (
  <div className="container">
    <div className="issues-listing">
      <Subnav
        text={'new issues'}
        color={'btn-primary'}
        addIssues={props.addIssues}
        search={props.search}
      />
      <IssuesListingHeader
        issuesLength={
          props.issues
            .filter(el => el.state === "open" )
            .length
        }
        issuesClose={
          props.issues
            .filter(el => el.state === "closed" )
            .length
        }
        stateOpen={props.stateOpen}
        stateClosed={props.stateClosed}
      />
    <IssuesListingBody
      issues={props.issues}
      chengedIssues={props.chengedIssues}
      issuesState={props.issuesState}
      searchField={props.searchField}
    />
    </div>
  </div>
);

IssuesListing.PropTypes = {
  addIssues: PropTypes.func,
  search:  PropTypes.func,
  issues: PropTypes.array,
  stateOpen: PropTypes.func,
  stateClosed: PropTypes.func,
  chengedIssues: PropTypes.func,
  issuesState: PropTypes.string,
  searchField: PropTypes.string,
};

export default IssuesListing;

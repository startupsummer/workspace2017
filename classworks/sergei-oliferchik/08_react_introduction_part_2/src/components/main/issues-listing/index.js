import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './index.css';

import Subnav from './subnav';
import IssuesListingHeader from './issues-listing__header';
import IssuesListingBody from './issues-listing__body';

class IssuesListing extends Component {
  render() {
    const props = this.props;
    const openIssues = props.issues
      .filter(el => el.state === "open" )
      .length;
    const closedIssues = props.issues.length - openIssues;
    return(
      <div className="container">
        <div className="issues-listing">
          <Subnav
            text={'new issues'}
            color={'btn-primary'}
            addIssues={props.addIssues}
            search={props.search}
          />
          <IssuesListingHeader
            issuesLength={openIssues}
            issuesClose={closedIssues}
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
  }
}

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

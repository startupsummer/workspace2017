import React, { Component } from 'react';

import Subnav from '../subnav/subnav';
import ButtonLink from '../button-link/button-link';
import Issue from '../issue/issue';

import './issues-listing.css';

class IssuesListing extends Component {
  render() {
    const {
      issuesList,
      issuesState,
      searchQuery,
      searchIssue,
      changeIssue,
      openNewIssue,
      showOpenIssues,
      showClosedIssues
    } = this.props;

    const foundIssues = issuesList.filter(i => i.title.toLowerCase().includes(searchQuery));
    const amtOpenIssues = foundIssues.filter(i => i.state === 'open').length;
    const amtClosedIssues = foundIssues.filter(i => i.state === 'closed').length;
    const filteredIssues = foundIssues.filter(i => i.state === issuesState);

    return (
      <div className="issues-listing">
        <div className="issues-listing__subnav">
          <Subnav openNewIssue={ openNewIssue } searchIssue={ searchIssue } />
        </div>

        <div className="issues-listing__header">
          <div className="issues-listing__states">
            <ButtonLink
              counter={ amtOpenIssues }
              selected={ issuesState === 'open' }
              click={ showOpenIssues }>
              Open
            </ButtonLink>
            <ButtonLink
              counter={ amtClosedIssues }
              selected={ issuesState === 'closed' }
              click={ showClosedIssues }>
              Close
            </ButtonLink>
          </div>
        </div>

        <div className="issues-listing__body">
          <div className="issues">
            { filteredIssues.map(item =>
              <Issue item={ item } key={ item.id } changeIssue={ changeIssue } />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default IssuesListing;

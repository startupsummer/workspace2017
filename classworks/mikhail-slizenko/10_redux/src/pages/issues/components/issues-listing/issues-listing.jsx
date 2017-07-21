import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import fromIssues from 'resources/issues/issues.selectors';

import Subnav from '../subnav/subnav';
import ButtonLink from 'components/button-link/button-link';
import Issue from '../issue/issue';

import './issues-listing.css';

class IssuesListing extends Component {
  state = {issuesState: 'open'}

  showOpenIssues = () =>
    this.state.issuesState === 'open'
      || this.setState({issuesState: 'open'});

  showClosedIssues = () =>
    this.state.issuesState === 'closed'
      || this.setState({issuesState: 'closed'});

  render() {
    const {issuesList, searchQuery} = this.props;
    const {issuesState} = this.state;

    let amtOpenIssues = 0, amtClosedIssues = 0;
    const filteredIssues = issuesList.filter(item => {
      if (item.title.toLowerCase().includes(searchQuery)) {
        item.state === 'open'
          ? amtOpenIssues++
          : amtClosedIssues++;
        return item.state === issuesState;
      }
      return false;
    });

    return (
      <div className='issues-listing'>
        <div className='issues-listing__subnav'>
          <Subnav />
        </div>

        <div className='issues-listing__header'>
          <div className='issues-listing__states'>
            <ButtonLink
              counter={ amtOpenIssues }
              selected={ issuesState === 'open' }
              click={ this.showOpenIssues }>
              Open
            </ButtonLink>
            <ButtonLink
              counter={ amtClosedIssues }
              selected={ issuesState === 'closed' }
              click={ this.showClosedIssues }>
              Close
            </ButtonLink>
          </div>
        </div>

        <div className='issues-listing__body'>
          <div className='issues'>
            { filteredIssues.map(item =>
              <Issue issue={ item } key={ item.id } />
            )}
          </div>
        </div>
      </div>
    );
  }
}

IssuesListing.propTypes = {
  issuesList: PropTypes.array.isRequired,
  searchQuery: PropTypes.string.isRequired
}

export default connect(
  state => ({
    issuesList: fromIssues.getIssuesList(state),
    searchQuery: fromIssues.getSearchQuery(state),
  })
)(IssuesListing);

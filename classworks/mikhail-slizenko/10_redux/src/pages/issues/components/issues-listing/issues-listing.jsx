import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import fromStore from 'index.selectors';
import { changeIssuesState } from 'resources/issues/issues.actions';

import Subnav from '../subnav/subnav';
import ButtonLink from 'components/button-link/button-link';
import Issue from '../issue/issue';

import './issues-listing.css';

class IssuesListing extends Component {
  static propTypes = {
    issuesList: PropTypes.array.isRequired,
    issuesState: PropTypes.string.isRequired,
    searchQuery: PropTypes.string.isRequired,
    changeIssuesState: PropTypes.func.isRequired
  }

  showOpenIssues = () => {
    if (this.props.issuesState === 'open') return;
    this.props.changeIssuesState('open');
  }

  showClosedIssues = () => {
    if (this.props.issuesState === 'closed') return;
    this.props.changeIssuesState('closed');
  }

  render() {
    const {
      issuesList,
      issuesState,
      searchQuery
    } = this.props;

    let amtOpenIssues = 0, amtClosedIssues = 0;
    const filteredIssues = issuesList.filter(i => {
      if (i.title.toLowerCase().includes(searchQuery)) {
        i.state === 'open' ? amtOpenIssues++ : amtClosedIssues++;
        return i.state === issuesState;
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

export default connect(
  state => ({
    issuesList: fromStore.getIssuesList(state),
    issuesState: fromStore.getIssuesState(state),
    searchQuery: fromStore.getSearchQuery(state),
  }), 
  { changeIssuesState }
)(IssuesListing);

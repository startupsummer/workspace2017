import React, { Component } from 'react';

import './index.css';

import Subnav from './subnav';
import IssuesListingHeader from './issues-listing__header';
import IssuesListingBody from './issues-listing__body';

class IssuesListing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchField: '',
      curStatus: 'closed',
    };
  }

  triger = (status) => () => {
    const curStatus = status === 'open' ? 'closed' : 'open';

    this.setState({ curStatus });
  }

  eventSearch = (e) => {
    const value = e.target.value;

    this.setState({ searchField: value });
  }

  render() {
    return(
      <div className="container">
        <div className="issues-listing">
          <Subnav eventSearch={this.eventSearch} />
          <IssuesListingHeader triger={this.triger} />
          <IssuesListingBody curStatus={this.state.curStatus} searchField={this.state.searchField}/>
        </div>
      </div>
    );
  }
}

export default IssuesListing;

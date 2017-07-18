import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  openNewIssue,
  setSearchQuery
} from 'resources/issues/issues.actions';

import Button from 'components/button/button';

import './subnav.css';

class Subnav extends PureComponent {
  searchIssue = event => {
    const searchQuery = event.target.value.toLowerCase();
    this.props.setSearchQuery(searchQuery);
  }

  openNewIssue = () => {
    this.props.openNewIssue()
  }

  render() {
    return (
      <div className="subnav">
        <form className="subnav__search">
          <input className="subnav__search-input" placeholder="Search" type="text" onChange={ this.searchIssue }/>
          <svg className="subnav__search-icon" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fillRule="evenodd" d="M15.7 13.3l-3.81-3.83A5.93 5.93 0 0 0 13 6c0-3.31-2.69-6-6-6S1 2.69 1 6s2.69 6 6 6c1.3 0 2.48-.41 3.47-1.11l3.83 3.81c.19.2.45.3.7.3.25 0 .52-.09.7-.3a.996.996 0 0 0 0-1.41v.01zM7 10.7c-2.59 0-4.7-2.11-4.7-4.7 0-2.59 2.11-4.7 4.7-4.7 2.59 0 4.7 2.11 4.7 4.7 0 2.59-2.11 4.7-4.7 4.7z"></path></svg>
        </form>
        <Button primary click={ this.openNewIssue }>New issue</Button>
      </div>
    );
  }
}

export default connect(null, {
  openNewIssue,
  setSearchQuery
})(Subnav);

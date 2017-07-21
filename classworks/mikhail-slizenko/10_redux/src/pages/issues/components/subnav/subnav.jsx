import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {
  openNewIssue,
  setSearchQuery
} from 'resources/issues/issues.actions';
import Button from 'components/button/button';
import SubnavSvg from './subnav-svg.jsx';

import './subnav.css';

class Subnav extends PureComponent {
  searchIssue = event => {
    const searchQuery = event.target.value.toLowerCase();
    this.props.setSearchQuery(searchQuery);
  }

  openNewIssue = () => {
    this.props.openNewIssue();
  }

  render() {
    return (
      <div className="subnav">
        <form className="subnav__search">
          <input
            className="subnav__search-input"
            placeholder="Search"
            onChange={this.searchIssue}
            type="text"
          />
          <SubnavSvg />
        </form>
        <Button primary click={this.openNewIssue}>New issue</Button>
      </div>
    );
  }
}

export default connect(null, {
  openNewIssue,
  setSearchQuery
})(Subnav);

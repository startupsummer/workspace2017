import React, { Component } from 'react';
import RepoHead from './RepoHead';
import NavIssues from './NavIssues';
import PropTypes from 'prop-types';

class PageHead extends Component {
  static propTypes = {
    itemsNumber: PropTypes.string,
  }
  
  render() {
    return (
      <div className="pagehead">
        <RepoHead />
        <NavIssues itemsNumber={this.props.itemsNumber}/>
      </div>
    )
  }
}

export default PageHead;

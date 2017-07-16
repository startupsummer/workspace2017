import React, { Component } from 'react';
import Issue from '../issue/issue';

import './issues.css';

class IssuesListing extends Component {
  render() {
    const { issues, changeIssue } = this.props;

    return (
      <div className="issues">
        { issues.map(item => 
          <Issue item={ item } key={ item.id } changeIssue={ changeIssue } />
        )}
      </div>
    );
  }
}

export default IssuesListing;

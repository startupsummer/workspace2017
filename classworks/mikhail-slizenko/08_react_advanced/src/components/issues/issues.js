import React, { Component } from 'react';
import Issue from '../issue/issue';

import './issues.css';

class IssuesListing extends Component {
  render() {
    return (
      <div className="issues">
        { this.props.issues.map(item => 
          <Issue item={ item } closeIssues={ this.props.closeIssues } openIssues={ this.props.openIssues } />
        )}
      </div>
    );
  }
}

export default IssuesListing;
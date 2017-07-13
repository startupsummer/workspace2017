import React, { Component } from 'react';
import SubnavSearch from './SubnavSearch';
import Button from './Button';


class IssuesListeningSubnav extends Component {
  render() {
    return (
        <div className="issues-listing__subnav">
          <div className="subnav">
            <SubnavSearch/>
            <Button> New Issue  </Button>
          </div>
        </div>
  )
  }
}

export default IssuesListeningSubnav;

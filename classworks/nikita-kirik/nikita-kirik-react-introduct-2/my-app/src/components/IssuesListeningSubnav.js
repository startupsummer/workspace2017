import React, { PureComponent } from 'react';
import SubnavSearch from './SubnavSearch';
import Button from './Button';


class IssuesListeningSubnav extends PureComponent {
  static propTypes = {
    onSearch: React.PropTypes.func.isRequired,
    onIssueAdd: React.PropTypes.func.isRequired
  }

  render() {
    return (
        <div className="issues-listing__subnav">
          <div className="subnav">
            <SubnavSearch onSearch={this.props.onSearch}/>
            <Button onIssueAdd={this.props.onIssueAdd}> New Issue </Button>
          </div>
        </div>
  )
  }
}

export default IssuesListeningSubnav;

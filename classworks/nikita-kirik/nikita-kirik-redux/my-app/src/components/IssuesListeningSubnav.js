import React, { PureComponent } from 'react';
import SubnavSearch from './SubnavSearch';
import Button from './Button';
import { issueAdd } from '../resources/issue/issue.actions'
import { connect } from 'react-redux';


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
          <Button onIssueAdd={this.props.issueAdd}> New Issue </Button>
        </div>
      </div>
    )
  }
}

export default connect(null, {
  issueAdd,
})(IssuesListeningSubnav);

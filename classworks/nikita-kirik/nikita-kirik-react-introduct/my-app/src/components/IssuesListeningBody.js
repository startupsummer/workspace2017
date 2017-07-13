import React, { Component } from 'react';
import IssuesItem from './IssuesItem';


class IssuesListeningBody extends Component {

  render() {
    const data = this.props.issuesState.data;
    console.log('datka', data);
    const listItems = data
      .filter(it => this.props.issuesType === it.state )
        .map(it =>
            <IssuesItem itemData={it} onIssueToogle={this.props.onIssueToogle} />
        );

    return (
      <ul className="issues">
        {listItems}
      </ul>
  )
  }
}

export default IssuesListeningBody;

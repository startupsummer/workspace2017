import React, { Component } from 'react';
import IssueItem from './IssueItem';

class ListBody extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="issues-listing__body">
        <ul className="issues">
          {
            this.props.data.map((item) =>
            <IssueItem onClick={this.props.onClick(item)} item={item}/>
            )
          }
        </ul>
      </div>
    )
  }
}

export default ListBody;

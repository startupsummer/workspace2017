import React, { Component } from 'react';
import Item from './Item';

export default class Body extends Component {
  constructor(props) {
    super(props);
    this.closeIssue = this.closeIssue.bind(this);
  }

  closeIssue(index) {
    this.props.onCloseIssue(index);
  }

  render() {
    const { data, currentTab } = this.props;

    return (
      <div className="issues-listing__body">
        <ul className="issues">
          {data.filter(issue => issue.state === currentTab).map(item => (
            <Item
              data={item}
              key={item.id}
              onCloseIssue={this.closeIssue}
            />
          ))}
        </ul>
      </div>
    );
  }
}

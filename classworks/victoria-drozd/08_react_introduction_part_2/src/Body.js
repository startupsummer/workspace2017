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
    let items = [];
    this.props.data.forEach((item, i) => {
      if (this.props.shouldBeDisplayed[i] === 1) {
        if (this.props.currentTab === 'open' && item.state === 'open') {
          items.push(
            <Item
              title={item.title}
              key={item.id}
              index={i}
              currentTab={this.props.currentTab}
              onCloseIssue={this.closeIssue}/>
          );
        } else if (this.props.currentTab === 'closed' && item.state === 'closed') {
          items.push(
            <Item
              title={item.title}
              key={item.id}
              index={i}
              currentTab={this.props.currentTab}
              onCloseIssue={this.closeIssue}/>
          );
        }
      }
    });

    return (
      <div className="issues-listing__body">
        <ul className="issues">
          {items}
        </ul>
      </div>
    );
  }
}

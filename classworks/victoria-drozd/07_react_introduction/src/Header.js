import React, { Component } from 'react';
import Btn from './Btn';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.showOpenTab = this.showOpenTab.bind(this);
    this.showClosedTab = this.showClosedTab.bind(this);
  }

  showOpenTab() {
    this.props.onShowOpenTab();
  }

  showClosedTab() {
    this.props.onShowClosedTab();
  }

  render() {
    let classStr1 = "btn-link", classStr2 = "btn-link";
    if (this.props.currentTab === 'open') {
      classStr1 += " btn-link--selected";
    } else {
      classStr2 += " btn-link--selected";
    }

    return (
      <div className="issues-listing__header">
        <div className="issues-listing__states">
          <Btn classes={classStr1} text={this.props.openIssuesNum + ' Open'} type="open" onShowOpenTab={this.showOpenTab} />
          <Btn classes={classStr2} text={this.props.closedIssuesNum + ' Closed'}  type="closed" onShowClosedTab={this.showClosedTab} />
        </div>
      </div>
    );
  }
}

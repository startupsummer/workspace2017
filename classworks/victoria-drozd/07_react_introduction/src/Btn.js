import React, { Component } from 'react';

export default class Btn extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    if (this.props.type === 'open') {
      this.props.onShowOpenTab();
    } else if (this.props.type === 'closed') {
      this.props.onShowClosedTab();
    } else if (this.props.type === 'new-issue') {
      this.props.onAddNewIssue();
    } else if (this.props.type === 'close-issue') {
      this.props.onCloseIssue();
    }
  }

  render() {
    let svg;
    if (this.props.type === 'open') {
      svg =
        <svg className="octicon octicon-issue-opened" aria-hidden="true" height={16} version="1.1" viewBox="0 0 14 16" width={14}>
          <path fillRule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"/>
        </svg>;
    } else if (this.props.type === 'closed') {
      svg =
        <svg className="octicon octicon-check" aria-hidden="true" height={16} version="1.1" viewBox="0 0 12 16" width={12}>
          <path fillRule="evenodd" d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5z"/>
        </svg>;
    }

    return (
      <button className={this.props.classes} type="button" onClick={this.handleClick}>
        {svg}
        {this.props.text}
      </button>
    );
  }
}

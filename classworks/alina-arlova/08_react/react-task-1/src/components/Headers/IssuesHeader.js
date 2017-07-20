import React, { Component } from 'react';
import ButtonLink from '../Buttons/ButtonLink.js';
import '../../main.css';

class IssuesHeader extends Component {
  constructor(props) {
    super(props);
    this.checkActivePage = this.checkActivePage.bind(this);
  }

  checkActivePage(state) {
    if (this.props.menuState === state) {
      return " btn-link--selected";
    } else {
      return "";
    };
  }

  render() {
    return (
      <div className="issues-listing__header">
        <div className="issues-listing__states">
          <ButtonLink
            className={this.checkActivePage("open")}
            svgClassName="open"
            text="Open"
            count={this.props.newIssues.filter(item => item.state === "open").length}
            onClick={this.props.onOpenClick}
          />
          <ButtonLink
            className={this.checkActivePage("closed")}
            svgClassName="closed"
            text="Close"
            count={this.props.newIssues.filter(item => item.state === "closed").length}
            onClick={this.props.onCloseClick}
          />
        </div>
      </div>
    );
  }
}

export default IssuesHeader;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import fromStore from '../../resources/issues.selector.js';
import { changeMenuState } from '../../resources/issues.actions.js';
import ButtonLink from '../Buttons/ButtonLink.js';
import '../../main.css';

class IssuesHeader extends Component {
  static propsTypes = {
    changeMenuState: PropTypes.func.isRequired,
    issues: PropTypes.array.isRequired,
    menuState: PropTypes.string.isRequired,
  }

  checkActivePage = (state) => {
    if (this.props.menuState === state) {
      return " btn-link--selected";
    } else {
      return "";
    };
  }

  openMenu = () => {
    this.props.changeMenuState('open');
  }

  closeMenu = () => {
    this.props.changeMenuState('closed');
  }

  render() {
    const issues = this.props.issues;
    const filteredIssues = issues.filter(issue => issue.title.toLowerCase().startsWith(this.props.searchText));

    return (
      <div className="issues-listing__header">
        <div className="issues-listing__states">
          <ButtonLink
            className={this.checkActivePage("open")}
            svgClassName="open"
            text="Open"
            count={filteredIssues.filter(item => item.state === "open").length}
            onClick = {this.openMenu}
          />
          <ButtonLink
            className={this.checkActivePage("closed")}
            svgClassName="closed"
            text="Close"
            count={filteredIssues.filter(item => item.state === "closed").length}
            onClick = {this.closeMenu}
          />
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  issues: fromStore.getIssues(state),
  menuState: fromStore.getMenuState(state),
  searchText: fromStore.getSearchText(state),
}), {
  changeMenuState,
})(IssuesHeader);

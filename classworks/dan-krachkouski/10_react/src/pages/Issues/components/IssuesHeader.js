import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import * as select from '../../../resources/selectors';

import Button from '../../../components/Button';


const svgOpen = (
<svg aria-hidden="true" className="octicon octicon-issue-opened" height="16" version="1.1" viewBox="0 0 14 16" width="14">
  <path fillRule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path>
</svg>);

const svgClosed = (
<svg aria-hidden="true" className="octicon octicon-check" height="16" version="1.1" viewBox="0 0 12 16" width="12">
  <path fillRule="evenodd" d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5z"></path>
</svg>);


class IssuesHeader extends Component {
  shouldComponentUpdate(nextProps) {
    return !(nextProps.countOpen === this.props.countOpen &&
      nextProps.countClosed === this.props.countClosed);
  }

  classType = (tab, expected) =>
    classNames('btn-link', { 'btn-link--selected': tab === expected });

  onSetTab = (tab) => () => this.props.setTab(tab);

  render() {
    const { tab, countOpen, countClosed } = this.props;
    return(
      <div className="issues-listing__header">
        <div className="issues-listing__states">

          <Button
            type={this.classType(tab, 'open')}
            click={this.onSetTab('open')} >
            {svgOpen} {countOpen} Open
          </Button>

          <Button
            type={this.classType(tab, 'closed')}
            click={this.onSetTab('closed')} >
            {svgClosed} {countClosed} Closed
          </Button>

        </div>
      </div>
    );
  }
}

IssuesHeader.propTypes = {
  tab: PropTypes.oneOf(['open', 'closed']).isRequired,
  setTab: PropTypes.func.isRequired,
  countOpen: PropTypes.number.isRequired,
  countClosed: PropTypes.number.isRequired,
};

export default connect((store, props) => ({
  countOpen: select.getIssuesCount(store, 'open'),
  countClosed: select.getIssuesCount(store, 'closed'),
  ...props,
}))(IssuesHeader);

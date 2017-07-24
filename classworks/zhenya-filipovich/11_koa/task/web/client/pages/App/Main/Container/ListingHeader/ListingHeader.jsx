import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'components/Button';
import 'listing-header.styles';
import { enableOpenTab, enableCloseTab } from 'index.selectors';

class ListingHeader extends Component {
  render() {
    const logo1 = (
      <svg aria-hidden="true" className="octicon octicon-issue-opened" height="16" version="1.1" viewBox="0 0 14 16" width="14">
        <path fillRule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z" />
      </svg>
    );

    const logo2 = (
      <svg aria-hidden="true" className="octicon octicon-check" height="16" version="1.1" viewBox="0 0 12 16" width="12">
        <path fillRule="evenodd" d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5z" />
      </svg>
    );

    return (
      <div className="issues-listing__header">
        <div className="issues-listing__states">
          <Button
            className={`btn-link ${this.props.openTab === 'open' && 'btn-link--selected'}`}
            type="button"
            onClick={this.props.enableOpenTab}
          >
            {logo1}
            {` ${this.props.openNumber} Opened`}
          </Button>
          <Button
            className={`btn-link ${this.props.openTab === 'closed' && 'btn-link--selected'}`}
            type="button"
            onClick={this.props.enableCloseTab}
          >
            {logo2}
            {` ${this.props.closedNumber} Closed`}
          </Button>
        </div>
      </div>
    );
  }
}

ListingHeader.propTypes = {
  openNumber: PropTypes.number.isRequired,
  closedNumber: PropTypes.number.isRequired,
  enableCloseTab: PropTypes.func.isRequired,
  enableOpenTab: PropTypes.func.isRequired,
  openTab: PropTypes.string.isRequired,
};

export default connect(state => ({
  openTab: state.openTab,
  openNumber: state.issues.reduce((acc, item) => ((item.state === 'open') ? acc + 1 : acc), 0),
  closedNumber: state.issues.reduce((acc, item) => ((item.state === 'closed') ? acc + 1 : acc), 0),
}), {
  enableOpenTab,
  enableCloseTab,
})(ListingHeader);


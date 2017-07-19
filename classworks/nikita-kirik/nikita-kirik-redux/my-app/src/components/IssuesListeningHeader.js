import React, { PureComponent } from 'react';

import SwitchButton from './SwitchButton';

class IssuesListeningHeader extends PureComponent {

  static propTypes = {
    onTabSwitch: React.PropTypes.func.isRequired
  }

  switchToOpenHandler = e => id => {
    this.props.onTabSwitch('open');
  }

  switchToCloseHandler = e => id => {
    this.props.onTabSwitch('closed');
  }

  render() {
    return (
      <div className="issues-listing__header">
        <div className="issues-listing__states">
          <SwitchButton  onClick={this.switchToOpenHandler()} >
            <svg aria-hidden="true" className="octicon octicon-issue-opened" height="16" version="1.1" viewBox="0 0 14 16" width="14">
              <path fill-rule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path>
            </svg>
            <span>{this.props.openCounter}</span> Open
            </SwitchButton>

            <SwitchButton  onClick={this.switchToCloseHandler()}>
              <svg aria-hidden="true" className="octicon octicon-issue-opened" height="16" version="1.1" viewBox="0 0 14 16" width="14">
                <path fill-rule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path>
              </svg>
              <span>{this.props.closeCounter}</span> Closed
              </SwitchButton>

            </div>
          </div>
        )
      }
    }

    export default IssuesListeningHeader;

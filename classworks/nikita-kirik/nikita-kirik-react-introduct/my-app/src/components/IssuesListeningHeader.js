import React, { Component } from 'react';

import ButtonOpened from './ButtonOpened';
import ButtonClosed from './ButtonClosed';

class IssuesListeningHeader extends Component {

  static propTypes = {
    onTabSwitch: React.PropTypes.func.isRequired,
  }

  render() {
    return (

      <div className="issues-listing__header">
        <div className="issues-listing__states">

        <ButtonOpened >2 Open</ButtonOpened>
        <ButtonClosed>0 Closed</ButtonClosed>

        </div>
      </div>
  )
  }
}

export default IssuesListeningHeader;

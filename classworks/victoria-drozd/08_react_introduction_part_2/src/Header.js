import React from 'react';
import classnames from 'classnames';

import Btn from './Btn';

export default ({openIssuesNum, closedIssuesNum, onShowOpenTab, onShowClosedTab, currentTab}) => {
  const openClass = classnames({
    'btn-link': true,
    'btn-link--selected': currentTab === 'open'
  });

  const closedClass = classnames({
    'btn-link': true,
    'btn-link--selected': currentTab === 'closed'
  });

  return (
    <div className="issues-listing__header">
      <div className="issues-listing__states">
        <Btn classes={openClass} type="open" onClick={onShowOpenTab}>
          {` ${openIssuesNum} Open`}
        </Btn>
        <Btn classes={closedClass} type="closed" onClick={onShowClosedTab}>
          {` ${closedIssuesNum} Closed`}
        </Btn>
      </div>
    </div>
  );
}

import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import Btn from '../../../components/Btn/Btn';

const Header =  ({openIssuesNum, closedIssuesNum, onShowOpenTab, onShowClosedTab, currentTab}) => {
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
};

Header.propsTypes = {
  openIssuesNum: PropTypes.func.isRequired,
  closedIssuesNum: PropTypes.func.isRequired,
  onShowOpenTab: PropTypes.func.isRequired,
  onShowClosedTab: PropTypes.func.isRequired,

  currentTab: PropTypes.string.isRequired,
};

export default Header;



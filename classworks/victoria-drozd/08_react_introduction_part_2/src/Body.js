import React from 'react';
import Item from './Item';

export default ({data, currentTab, onCloseIssue}) => (
  <div className="issues-listing__body">
    <ul className="issues">
      {data.filter(issue => issue.state === currentTab).map(item => (
        <Item
          data={item}
          key={item.id}
          onCloseIssue={onCloseIssue}
        />
      ))}
    </ul>
  </div>
);

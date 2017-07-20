import React from 'react';
import Item from './Item';
import PropTypes from 'prop-types';

const Body = ({data, currentTab, onCloseIssue}) => (
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

Body.propTypes = {
  data: PropTypes.array.isRequired,
  currentTab: PropTypes.string.isRequired,
  onCloseIssue: PropTypes.func.isRequired,
};

export default Body;

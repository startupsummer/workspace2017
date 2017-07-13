import React from 'react';
import PropTypes from 'prop-types';

import Search from '../subnav__search';
import Button from '../button';

import './index.css';

const Subnav = (props) => (
  <div className="issues-listing__subnav">
    <div className="subnav">
        <Search search={props.search}/>
        <Button
          text={props.text}
          color={props.color}
          eventClick={props.addIssues}
          />
    </div>
  </div>
);

Subnav.PropTypes = {
  addIssues: PropTypes.func,
  text: PropTypes.string,
  color: PropTypes.string,
  search: PropTypes.func,
};

export default Subnav;

import React from 'react';
import PropTypes from 'prop-types';

import Button from '../button';
import './index.css';

const IssuesItem = (props) => (
  <div className="issues__item">
    <div className="issues__status issues__status--open">
      <svg className="issues__icon" height="16" version="1.1" viewBox="0 0 14 16" width="14"><path fillRule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path></svg>
    </div>
    <div className="issues__title">
      <a href="" className="issues__link">
        {props.issues.title}
      </a>
    </div>
    <Button text={'Close issues'} eventClick={props.onDelete} id={props.issues.id}/>
  </div>
);

IssuesItem.PropTypes = {
  onDelete: PropTypes.func,
  issues: PropTypes.array,
};

export default IssuesItem;

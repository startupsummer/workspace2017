import '../../../../main.css';
import Button from '../../../button/button.js';
import {Link} from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';

const IssueItem = ({
  state,
  title,
  issueId,
  openButton,
  closeButton,
  number,
}) => {

  const clickFunc = state === "closed" ? openButton : closeButton;
  const output = `${state === 'open' ? 'Close issue' : 'Open issue'}`;

  return (
    <li key={issueId} className="issues__item">
      <div className={`issues__status ${state === 'open' ? 'issues__status--open' : ''}`}>
        <svg className="issues__icon" height="16" version="1.1" viewBox="0 0 14 16" width="14"><path fill-rule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path></svg>
      </div>
      <div className="issues__title">
        <Link to={`/${issueId}`}>
          {title}
        </Link>
      </div>
      <Button 
        className="issue__close" 
        issueId={issueId} 
        text={output}
        buttonClick={clickFunc}
        number={number}
      />
    </li>
  );
}

IssueItem.propTypes = {
  state: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  issueId: PropTypes.string.isRequired,
  openButton: PropTypes.func.isRequired,
  closeButton: PropTypes.func.isRequired,
  number: PropTypes.number.isRequired,
}

export default IssueItem;

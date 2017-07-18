import React from 'react';
import '../../../main.css';

const Issues = ({
  issues,
}) => {
  const itemByState = (status) => issues.reduce((acc, issue) => (issue.state === status ? acc + 1 : acc), 0);
  return (
    <div className="container">
      <nav className="reponav">
          <a className="reponav-item selected">
            <svg height="16" version="1.1" viewBox="0 0 14 16" width="14">
              <path fill-rule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path>
            </svg>
            <span>Issues</span>
            <span className="counter">{itemByState('open')}</span>
          </a>
      </nav>
    </div>
  )
}
Issues.propTypes = {
  counter: React.PropTypes.number.isRequired,
};

export default Issues;
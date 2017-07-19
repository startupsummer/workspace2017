import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import './listing-body.styles';

const ListingBody = ({
  openTab,
  changeIssueState,
  items,
  inputValue,
}) => {
  const buttonTitle = (openTab === 'open') ?
    'Close issue' : 'Open issue';
  const issueList = items
    .filter(item => item.state === openTab && item.title.toLowerCase().includes(inputValue));

  return (
    <div className="issues-listing__body">
      <ul className="issues">
        {
          issueList.map(item => (
            <li key={item.id} className="issues__item">
              <div className="issues__status issues__status--open">
                <svg className="issues__icon" height="16" version="1.1" viewBox="0 0 14 16" width="14">
                  <path fillRule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z" />
                </svg>
              </div>
              <div className="issues__title">
                <Link
                  to={`/issue/:${item.id}`}
                  className="issues__link"
                >
                  {item.title}
                </Link>
              </div>
              <Button
                className="btn issue__close"
                onClick={() => changeIssueState(item)}
              >
                {buttonTitle}
              </Button>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

ListingBody.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  openTab: PropTypes.string.isRequired,
  inputValue: PropTypes.string.isRequired,
  changeIssueState: PropTypes.func.isRequired,
};

export default ListingBody;

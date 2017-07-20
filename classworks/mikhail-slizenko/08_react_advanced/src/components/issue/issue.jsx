import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from '../button/button';

import './issue.css';

export default class Issue extends PureComponent {
  static PropTypes = {
    item: PropTypes.object.isRequired,
    changeIssue: PropTypes.func.isRequired
  }

  render() {
    const { item, changeIssue } = this.props;

    return (
        <div className="issue" key={ item.id }>
          <div className="issue__status">
            { item.state === 'open' 
              ? <svg className="issue__icon issue__icon--open" aria-hidden="true" height="16" version="1.1" viewBox="0 0 14 16" width="14"><path fillRule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path></svg>
              : <svg className="issue__icon issue__icon--closed" aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fillRule="evenodd" d="M7 10h2v2H7v-2zm2-6H7v5h2V4zm1.5 1.5l-1 1L12 9l4-4.5-1-1L12 7l-1.5-1.5zM8 13.7A5.71 5.71 0 0 1 2.3 8c0-3.14 2.56-5.7 5.7-5.7 1.83 0 3.45.88 4.5 2.2l.92-.92A6.947 6.947 0 0 0 8 1C4.14 1 1 4.14 1 8s3.14 7 7 7 7-3.14 7-7l-1.52 1.52c-.66 2.41-2.86 4.19-5.48 4.19v-.01z"></path></svg>
            }
          </div>
          <div className="issue__title">
            <Link to={ `/${item.id}` } className="issue__link">
              { item.title }
            </Link>
          </div>
          { item.state === 'open' 
            ? <Button click={ changeIssue(item) }>Close issue</Button>
            : <Button click={ changeIssue(item) }>Reopen issue</Button>
          }
        </div>
    );
  }
}

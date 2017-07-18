import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { changeIssue } from 'resources/issues/issues.actions';

import Button from 'components/button/button';

import './issue.css';

class Issue extends PureComponent {
  static propTypes = {
    issue: PropTypes.object.isRequired,
    changeIssue: PropTypes.func.isRequired
  }

  handleClick = () => {
    this.props.changeIssue(this.props.issue)
  }

  render() {
    const { issue } = this.props;

    return (
        <div className="issue">
          <div className="issue__status">
            { issue.state === 'open' 
              ? <svg className="issue__icon issue__icon--open" aria-hidden="true" height="16" version="1.1" viewBox="0 0 14 16" width="14"><path fillRule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path></svg>
              : <svg className="issue__icon issue__icon--closed" aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fillRule="evenodd" d="M7 10h2v2H7v-2zm2-6H7v5h2V4zm1.5 1.5l-1 1L12 9l4-4.5-1-1L12 7l-1.5-1.5zM8 13.7A5.71 5.71 0 0 1 2.3 8c0-3.14 2.56-5.7 5.7-5.7 1.83 0 3.45.88 4.5 2.2l.92-.92A6.947 6.947 0 0 0 8 1C4.14 1 1 4.14 1 8s3.14 7 7 7 7-3.14 7-7l-1.52 1.52c-.66 2.41-2.86 4.19-5.48 4.19v-.01z"></path></svg>
            }
          </div>
          <div className="issue__title">
            <Link to={ `/${issue.id}` } className="issue__link">
              { issue.title }
            </Link>
          </div>
          { issue.state === 'open' 
            ? <Button click={ this.handleClick }>Close issue</Button>
            : <Button click={ this.handleClick }>Reopen issue</Button>
          }
        </div>
    );
  }
}

export default connect(null, {
  changeIssue
})(Issue);

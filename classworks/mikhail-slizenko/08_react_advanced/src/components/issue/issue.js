import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Button from '../button/button';

import './issue.css';

class Issue extends Component {
  render() {
    return (
        <div className="issue" key={ this.props.item.id }>
          <div className="issue__status issue__status--open">
              <svg className="issue__icon" height="16" version="1.1" viewBox="0 0 14 16" width="14"><path fill-rule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path></svg>
          </div>
          <div className="issue__title">
            <Link to={ `/${this.props.item.id}` } className="issue__link">
              { this.props.item.title }
            </Link>
          </div>
          { this.props.item.state === 'open' 
            ? <Button text="Close issue" click={ this.props.closeIssues(this.props.item.number) }/>
            : <Button text="Open issue" click={ this.props.openIssues(this.props.item.number) }/>
          }
        </div>
    );
  }
}

export default Issue;
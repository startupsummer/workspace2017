import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {changeIssue} from 'resources/issues/issues.actions';
import Button from 'components/button/button';
import IssueSvg from './issue-svg';

import './issue.css';

class Issue extends PureComponent {
  handleClick = () => {
    this.props.changeIssue(this.props.issue)
  }

  render() {
    const {issue} = this.props;

    return (
        <div className="issue">
          <div className="issue__status">
            {issue.state === 'open'
              ? <IssueSvg type='open' />
              : <IssueSvg type='closed' />
            }
          </div>
          <div className="issue__title">
            <Link to={`/${issue.id}`} className="issue__link">
              {issue.title}
            </Link>
          </div>
          {issue.state === 'open'
            ? <Button click={this.handleClick}>
                Close issue
              </Button>
            : <Button click={this.handleClick}>
                Reopen issue
              </Button>
          }
        </div>
    );
  }
}

Issue.propTypes = {
  issue: PropTypes.object.isRequired,
  changeIssue: PropTypes.func.isRequired
}

export default connect(null, {
  changeIssue
})(Issue);

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import RepoheadSvg from './repohead-svg.jsx';

import './repohead.css';

class Repohead extends PureComponent {
  render() {
    const {username, reponame} = this.props;

    return (
      <div className="repohead">
          <h1 className="repohead__title">
            <RepoheadSvg />
            <a className="repohead__username" href="/"> {username}</a>
            <span> / </span>
            <b><a className="repohead__reponame" href="/">{reponame}</a></b>
          </h1>
      </div>
    );
  }
}

Repohead.propTypes = {
  username: PropTypes.string.isRequired,
  reponame: PropTypes.string.isRequired
}

Repohead.defaultProps = {
  username: 'startupsummer',
  reponame: 'react-task-1'
}

export default Repohead;

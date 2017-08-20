import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUsername } from 'resources/user/user.selectors';
import { logout } from 'resources/user/user.actions';
import './header.styles';


class Header extends React.Component {
  static propsTypes = {
    username: PropTypes.string.isRequired,
  }

  logout = () => {
    return this.props.logout();
  }

  render() {
    return (
      <div className="header">
        <div>
          <div>Hello, <b>{ this.props.username }</b></div>
          <a href="#" onClick={this.logout}>Logout</a>
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  username: getUsername(state),
}), { logout })(Header);

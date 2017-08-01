import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './message.styles';

class Message extends React.Component {
  render() {
    return (
      <div className="message">
        <div className="content-wrap">
          <div className="content">
            {this.props.content}
          </div>
          <div className="sender">
            {this.props.senderId}
          </div>
        </div>

        <div className="delete" onClick={this.props.deleteMes}>
        </div>
      </div>
    );
  }
};

Message.propTypes = {
  onClick: PropTypes.func,
  content: PropTypes.string,
  username: PropTypes.string
};

export default Message;

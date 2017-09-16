import React from 'react';
import PropTypes from 'prop-types';
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
        <div onClick={() => this.props.onDeleteMessage(this.props.id)} className="delete"></div>
      </div>
    );
  }
};

Message.propTypes = {
  content: PropTypes.string,
  username: PropTypes.string,
  deleteMessage: PropTypes.func,
};

export default Message;

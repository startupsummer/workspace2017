import React from 'react';
import PropTypes from 'prop-types';
import './message.styles';

class Message extends React.Component {
  render() {
    const { content, senderId, onDeleteMessage, id } = this.props;
    return (
      <div className="message">
        <div className="content-wrap">
          <div className="content">
            {content}
          </div>
          <div className="sender">
            {senderId}
          </div>
        </div>

        <div className="delete" onClick={() => onDeleteMessage(id)} />
      </div>
    );
  }
};

Message.propTypes = {
  content: PropTypes.string,
  username: PropTypes.string
};

export default Message;

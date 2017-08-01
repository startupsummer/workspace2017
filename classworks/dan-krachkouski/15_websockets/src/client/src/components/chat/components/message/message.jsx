import React from 'react';
import PropTypes from 'prop-types';
import './message.styles';

class Message extends React.Component {

  deleteSelf = () => {
    this.props.deleteMessage(this.props.id);
  }

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

        <button
          className="delete"
          onClick={this.deleteSelf}
        />
      </div>
    );
  }
}

Message.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  senderId: PropTypes.string.isRequired,
  deleteMessage: PropTypes.func.isRequired,
};

export default Message;

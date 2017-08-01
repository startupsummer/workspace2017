import React from 'react';
import PropTypes from 'prop-types';
import './message.styles';

class Message extends React.Component {

  deleteHandler = () => {
    this.props.delete(this.props.idMess)
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

        <div className="delete" onClick={ this.deleteHandler }></div>
      </div>
    );
  }
};

Message.propTypes = {
  content: PropTypes.string,
  username: PropTypes.string
};

export default Message;

import React from 'react';
import PropTypes from 'prop-types';
import './message.styles';
import io from 'socket.io-client';


import { deleteMessage } from 'resources/message/message.actions';
import { connect } from 'react-redux';


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

        <div className="delete" onClick={() => {/*console.log(this.props.deleteMessage(this.props.id));*/ this.props.deleteMessage(this.props.id)}}></div>
      </div>
    );
  }
};

Message.propTypes = {
  content: PropTypes.string,
  username: PropTypes.string
};

export default connect(state => null, {
  deleteMessage
})(Message);


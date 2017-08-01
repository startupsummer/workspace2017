import React from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';

import { sendMessage, pushNewMessage, loadMessages, deleteMessage, deleteMessageLocal } from 'resources/message/message.actions';
import { getUsername } from 'resources/user/user.selectors';
import { setRoomId } from 'resources/room/room.actions';
import { getRoomId } from 'resources/room/room.selectors';
import { getMessages } from 'resources/message/message.selectors';
import { connect } from 'react-redux';
import Message from './components/message/index';

import './chat.styles';

const socket = io();


class Chat extends React.Component {
  componentWillMount() {
    this.state = {
      content: '',
      roomId: this.props.roomId,
    };

    this.props.loadMessages({ roomId: this.state.roomId });
    socket.emit('subscribe', { roomId: this.state.roomId });

    socket.on('message:sent', (message) => {
      this.props.pushNewMessage(message);
    });

    socket.on('message:deleted', (id) => {
      this.props.deleteMessageLocal(id);
    });

    socket.on('user:typing:recive', ({ roomId, userId }) => {
      if (this.state.roomId === roomId &&
        this.props.userId !== userId) {
        this.setTypingUser(userId);
        clearTimeout(this.typingUserTimeout);
        this.typingUserTimeout = setTimeout(() => {
          this.setTypingUser();
        }, 1000);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const { roomId } = nextProps;

    if (this.state.roomId !== roomId) {
      socket.emit('unsubscribe', { roomId: this.state.roomId });
      this.props.loadMessages({ roomId });
      socket.emit('subscribe', { roomId });
    }

    this.setState({ roomId });
  }

  onRoomChanged = (evt) => {
    const roomId = evt.target.value || null;
    this.props.setRoomId(roomId);
  }

  onTextareaChange = (event) => {
    this.setState({
      content: event.target.value,
    });
    socket.emit('user:typing:send', {
      roomId: this.state.roomId,
      userId: this.props.userId,
    });
  }

  setTypingUser = (userId) => {
    this.setState({
      typingUser: userId ? `${userId} is typing...` : '',
    });
  }

  sendMessage = async () => {
    if (this.state.content) {
      const message = {
        senderId: this.props.userId,
        roomId: this.state.roomId,
        content: this.state.content,
      };

      await this.props.sendMessage(message);

      this.setState({ content: '' });
    }
  }

  deleteMessage = async (id) => {
    await this.props.deleteMessage(id);
  }

  render() {
    const messages = this.props.messages.map(message => (
      <Message
        key={message._id}
        id={message._id}
        content={message.content}
        senderId={message.senderId}
        deleteMessage={this.props.deleteMessage}
      />),
    );

    return (
      <div className="chat-container">
        <div className="top">
          <h3>Chat</h3>
          <select
            value={this.state.roomId || ''}
            onChange={this.onRoomChanged}
          >
            <option value=""> Public (no room) </option>
            <option value="1">Room #1</option>
            <option value="2">Room #2</option>
            <option value="3">Room #3</option>
          </select>
        </div>

        <div className="chat">
          <div className="content">
            {messages}
          </div>
          <div>{this.state.typingUser}</div>
          <div className="footer">
            <textarea
              value={this.state.content}
              onChange={this.onTextareaChange}
            />
            <button onClick={this.sendMessage}> Send </button>
          </div>
        </div>
      </div>
    );
  }
}

Chat.propTypes = {
  userId: PropTypes.string.isRequired,
  roomId: PropTypes.string.isRequired,
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,

  loadMessages: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  setRoomId: PropTypes.func.isRequired,
  pushNewMessage: PropTypes.func.isRequired,
  deleteMessage: PropTypes.func.isRequired,
  deleteMessageLocal: PropTypes.func.isRequired,
};

export default connect(state => ({
  userId: getUsername(state),
  roomId: getRoomId(state) || 'public',
  messages: getMessages(state),
}), {
  loadMessages,
  sendMessage,
  pushNewMessage,
  setRoomId,
  deleteMessage,
  deleteMessageLocal,
})(Chat);

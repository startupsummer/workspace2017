import React from 'react';
import { sendMessage, pushNewMessage, loadMessages, deleteMessage, removeMessage } from 'resources/message/message.actions';
import { getUsername } from 'resources/user/user.selectors';
import { setRoomId } from 'resources/room/room.actions';
import { getRoomId } from 'resources/room/room.selectors';
import { getMessages } from 'resources/message/message.selectors';
import { connect } from 'react-redux';
import io from 'socket.io-client';
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
    socket.emit('subscribe', { roomId: this.state.roomId || 'public' });

    socket.on('message:sent', message => {
      this.props.pushNewMessage(message);
    });

    socket.on('message:deleted', message => {
      this.props.removeMessage(message._id);
    });
  }

  componentWillReceiveProps(nextProps) {
    const { roomId } = nextProps;

    if (this.state.roomId !== roomId) {
      socket.emit('unsubscribe', { roomId: this.state.roomId || 'public' });

      this.props.loadMessages({ roomId });

      socket.emit('subscribe', { roomId });
    }

    this.setState({ roomId });
  }

  onRoomChanged = (evt) => {
    const roomId = evt.target.value || null;
    this.props.setRoomId(roomId);
    return this.props.loadMessages({ roomId });
  };

  sendMessage = async () => {
    if (this.state.content) {
      const message = {
        senderId: this.props.userId,
        roomId: this.state.roomId,
        content: this.state.content,
      };

      await this.props.sendMessage(message);

      // socket.emit('message:send', message, (res) => {
      //   console.log('received response', res)
      // });

      this.setState({ content: '' });
    }
  };

  deleteMessage = async (id) => {
    await this.props.deleteMessage(id);
  };

  render() {
    const messages = this.props.messages.map(message => {
      return (<Message
        key={message._id}
        content={message.content}
        senderId={message.senderId}
        onDeleteMessage={this.deleteMessage}
        id={message._id}
      />);
    });

    return (
      <div className="chat-container">
        <div className="top">
          <h3>Chat</h3>
          <select 
            value={this.state.roomId || ''} 
            onChange={this.onRoomChanged}>
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
          <div className="footer">
            <textarea value={this.state.content} onChange={(e) => this.setState({ content: e.target.value })}/>
            <button onClick={this.sendMessage}> Send </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  userId: getUsername(state),
  roomId: getRoomId(state),
  messages: getMessages(state),
}), {
  loadMessages,
  sendMessage,
  pushNewMessage,
  setRoomId,
  deleteMessage,
  removeMessage,
})(Chat);

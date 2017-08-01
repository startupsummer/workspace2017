import React from 'react';
import { sendMessage, pushNewMessage, removeMessage, popMessage } from 'resources/message/message.actions';
import { getUsername } from 'resources/user/user.selectors';
import { setRoomId } from 'resources/room/room.actions';
import { getRoomId } from 'resources/room/room.selectors';
import { loadMessages } from 'resources/message/message.actions';
import { getMessages } from 'resources/message/message.selectors';
import { connect } from 'react-redux';
import Message from './components/message/index';
import io from 'socket.io-client';

const socket = io();

import './chat.styles';

class Chat extends React.Component {
  componentWillMount() {
    this.state = {
      content: '',
      roomId: this.props.roomId,
      typing: '',
      typingSetTimeoutId: 0,
    };

    this.props.loadMessages({ roomId: this.state.roomId });
    socket.emit('subscribe', { roomId: this.state.roomId || 'public'  });

    socket.on('message:sent', message => {
      this.props.pushNewMessage(message);
    })

    socket.on('message:removed', message => {
      this.props.popMessage(message._id);
    })

    socket.on('message:typing', (userName, date) => {
      clearTimeout(this.state.typingSetTimeoutId);

      const typingSetTimeoutId = setTimeout(() => this.setState({ typing: '' }), 1000);

      if(userName !== this.state.typing) {
        console.log(userName.length)
        this.setState({ typing: userName, typingSetTimeoutId });
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    const { roomId } = nextProps;

    if (this.state.roomId !== roomId) {
      socket.emit('unsubscribe', { roomId: this.state.roomId || 'public' });

      this.props.loadMessages({ roomId });

      socket.emit('subscribe', { roomId: roomId || 'public' });
    }

    this.setState({ roomId });
  }

  sendMessage = async () => {
    if (this.state.content) {
      const message = {
        senderId: this.props.userId,
        roomId: this.state.roomId,
        content: this.state.content
      };

      await this.props.sendMessage(message);

      // socket.emit('message:send', message, (res) => {
      //   console.log('received response', res)
      // });

      this.setState({ content: '' });
    }
  }

  deleteMessange = (id) => async () => {
    const payload = {
      senderId: id,
      roomId: this.state.roomId
    };
    await this.props.removeMessage(payload)
  }

  typingMessage = (e) => {
    const userName = this.props.userId;
    socket.emit('typing', { roomId: this.state.roomId || 'public', userName })

    this.setState({ content: e.target.value });
  }

  onRoomChanged = (evt) => {
    const roomId = evt.target.value || null;

    this.props.setRoomId(roomId);
    return this.props.loadMessages({ roomId });
  }

  render() {
    const messages = this.props.messages.map(message => {
      return <Message key={message._id} content={message.content} senderId={message.senderId} deleteMessage={this.deleteMessange(message._id)} />;
    });
    const typing = this.state.typing ? `typing ${this.state.typing}...` : ''
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
            <textarea value={this.state.content} onChange={this.typingMessage} placeholder={typing}/>
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
  removeMessage,
  popMessage,
  setRoomId,
})(Chat);

import React from 'react';
import { sendMessage, pushNewMessage, deleteMessage, deleteMessageAll  } from 'resources/message/message.actions';
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
      roomId: this.props.roomId ,
      typing: '',
      typingTime: new Date()
    };

    this.props.loadMessages({ roomId: this.state.roomId });
    socket.emit('subscribe', { roomId: this.state.roomId || 'public'  });

    socket.on('message:sent', message => {
      this.props.pushNewMessage(message);
    })

    socket.on('message:delete', message => {
      this.props.deleteMessageAll(message._id);
    })

    socket.on('typing', text => {
      this.setState({ typing: text });

      
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
      
      this.setState({ content: '' });
    }
  }

  onRoomChanged = (evt) => {
    const roomId = evt.target.value || null;
    this.props.setRoomId(roomId);
    
    return this.props.loadMessages({ roomId });
  }

  changed = (e) => {
    this.setState({ content: e.target.value })
    socket.emit('typing', `${this.props.userId} is typing`)

    setTimeout(() => {
      socket.emit('typing', '')
    }, 2500)
  }

  render() {
    const messages = this.props.messages.map(message => {
      return <Message key={message._id} idMess={message._id} content={message.content} senderId={message.senderId} delete={ this.props.deleteMessage }/>;
    });

    console.log(this.state.typing)
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
          <div className="typing">
            {this.state.typing}
          </div>
          <div className="footer">
            <textarea value={this.state.content} onChange={ this.changed }/>
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
  deleteMessage,
  deleteMessageAll,
  setRoomId,
})(Chat);

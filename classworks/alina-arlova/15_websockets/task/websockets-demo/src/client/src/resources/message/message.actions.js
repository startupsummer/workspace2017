import * as api from './message.api';

export const loadMessages = ({ roomId = null } = {}) => async (dispatch) => {
  dispatch({ type: 'clearMessages' });
  const messages = await api.loadMessages({ roomId });
  dispatch({ type: 'fetchMessages', payload: messages });
};

export const sendMessage = ({ senderId, content, roomId = null } = {}) => async (dispatch) => {
  const message = await api.sendMessage({ senderId, content, roomId });
  dispatch({ type: 'messageSent', payload: message });
};

export const pushNewMessage = message => async (dispatch) => {
  dispatch({ type: 'messageSent', payload: message });
};

export const deleteMessage = messageId => async (dispatch) => {
  const message = await api.deleteMessage({ messageId });
  dispatch({ type: 'deleteMessage', payload: messageId });
};

export const deleteSubscribedMessage = messageId => async (dispatch) => {
  dispatch({ type: 'deleteMessage', payload: messageId });
};

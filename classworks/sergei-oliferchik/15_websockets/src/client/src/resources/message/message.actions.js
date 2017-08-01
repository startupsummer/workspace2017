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

export const removeMessage = ({ senderId, roomId = null } = {}) => async (dispatch) => {
  const message = await api.removeMessage(senderId);
  dispatch({ type: 'removeMessage', payload: senderId });
};

export const pushNewMessage = message => async (dispatch) => {
  dispatch({ type: 'messageSent', payload: message });
};

export const popMessage = id => async (dispatch) => {
  dispatch({ type: 'removeMessage', payload: id });
};

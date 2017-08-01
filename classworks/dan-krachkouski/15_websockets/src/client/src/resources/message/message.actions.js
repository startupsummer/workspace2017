import * as api from './message.api';

export const loadMessages = ({ roomId } = {}) => async (dispatch) => {
  dispatch({ type: 'clearMessages' });
  const messages = await api.loadMessages({ roomId });
  dispatch({ type: 'fetchMessages', payload: messages });
};

export const sendMessage = ({ senderId, content, roomId = null } = {}) => async (dispatch) => {
  const message = await api.sendMessage({ senderId, content, roomId });
  dispatch({ type: 'messageSent', payload: message });
};

export const deleteMessage = id => async (dispatch) => {
  await api.deleteMessage(id);
  dispatch({ type: 'messageDelete', payload: id });
};

export const deleteMessageLocal = id => async (dispatch) => {
  dispatch({ type: 'messageDelete', payload: id });
};

export const pushNewMessage = message => async (dispatch) => {
  dispatch({ type: 'messageSent', payload: message });
};

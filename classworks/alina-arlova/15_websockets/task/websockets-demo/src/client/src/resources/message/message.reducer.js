const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case 'clearMessages':
      return [];
    case 'fetchMessages':
      return action.payload.results;
    case 'messageSent':
      const newMessage = action.payload;
      if (!state.find(m => m._id === newMessage._id)) {
        return [newMessage, ...state];
      }
      return state;
    case 'deleteMessage':
      const messages = Object.assign([], state);
      const newMessages = messages.filter(message => message._id !== action.payload);
      return newMessages;
    default:
      return state;
  }
};

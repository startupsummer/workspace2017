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
    case 'messageDelete':
      const newState = state.filter((message) => message._id != action.payload.messageId);
      return newState;
    default:
      return state;
  }
};

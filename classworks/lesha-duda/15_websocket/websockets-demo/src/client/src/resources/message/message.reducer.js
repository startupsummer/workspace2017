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
      const message_id = action.payload;
      console.log(message_id)
      const deleteMessage = state.filter(m => m._id !== message_id)
      return deleteMessage
    default:
      return state;
  }
};

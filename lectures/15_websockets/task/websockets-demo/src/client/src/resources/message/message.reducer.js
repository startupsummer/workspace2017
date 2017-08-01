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
    default:
      return state;
  }
};

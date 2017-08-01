const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case 'clearMessage':
      console.log('Go');  
      return state.filter(message => message._id !== action._id);         
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

const initialState = { id: null };

export default (state = initialState, action) => {
  switch (action.type) {
    case 'setRoomId':
      return { id: action.payload };
    default:
      return state;
  }
};

export default (state = [], action) => {
  switch (action.type) {
    case 'INITIAL_STATE':
      return action.payload;

    case 'ADD_ISSUES':
      return state.concat(action.payload);

    case 'CHENGE_ISSUES':
      return state.map(el =>
        el.id === action.payload.id
          ? { ...el, state: action.payload.state }
          : el
      );

    default:
      return state
  }
}

export default (state = [], action) => {
  switch (action.type) {
    case 'INITIAL_STATE':
      return action.payload;

    case 'ADD_ISSUES':
      return state.concat(action.payload);

    case 'CHENGE_ISSUES':
      return state.map(issue =>
        issue.id === action.payload.id
          ? { ...issue, state: action.payload.state }
          : issue
      );

    default:
      return state
  }
}

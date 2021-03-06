export default (state = [], action) => {
  switch (action.type) {
    case 'fetchItems':
      return action.payload.map(item => {return {...item, id: item.id.toString()}});
    case 'itemAdd':
      return [...state, {...action.payload, id: action.payload.id.toString()}];
    case 'itemOpen':
      return state.map(issue =>
        issue.id === action.id ? { ...issue, state: 'open' }
        : issue
      );
    case 'itemClose':
      return state.map(issue =>
        issue.id === action.id ? { ...issue, state: 'closed' }
        : issue
      );
    default:
      return state;
  }
};

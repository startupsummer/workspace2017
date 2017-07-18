const route = {
  'FETCH_ISSUES': (state, payload, nextState) => {
    nextState.issues = payload;
    return nextState;
  },
  'SET_ISSUE_STATE': (state, payload, nextState) => {
    nextState.issues = [...state.issues];
    const index = nextState.issues.findIndex(issue => issue.id === payload.id);
    nextState.issues.splice(index, 1)
    nextState.issues.push(payload);
    return nextState;
  },
  'OPEN_ISSUE': (state, payload, nextState) => {
    nextState.issues = [...state.issues, payload];
    return nextState;
  },
};

const combinedReducer = (state = {
  issues: []
}, action) => {
  if (route[action.type]) {
    const nextState = {...state};
    const reducer = route[action.type];
    return reducer(state, action.payload, nextState);
  }
  return state;
};

export default combinedReducer;

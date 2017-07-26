export default (state = { state: [] }, action) => {
  switch (action.type) {
    case 'fetchList':
      return {...state, state: action.payload}
    case 'addListItem':
      const newIssuesAdd = [...state.state, action.payload]
      return {...state, state: newIssuesAdd}
    case 'closeListItem':
      const newIssuesDel = state.state.map(item => item.id === action.payload.id ? action.payload: item)
      return { ...state, state: newIssuesDel }
    default:
      return state;
  }
}

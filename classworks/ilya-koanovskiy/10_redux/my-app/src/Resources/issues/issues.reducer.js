export default (state = {issues : [], activeButton : "open", value : ''}, action) => {
  let newIssues;
  switch(action.type){
    case 'ADD_ISSUE':
      newIssues = [...state.issues,action.payload];
      return {...state,issues : newIssues};
    case 'FETCH_ISSUES':
      console.log(action.payload);
      return {...state,issues : action.payload};
    case 'CHANGE_ISSUE':
      newIssues = state.issues.map(item => item.number == action.number ? action.payload : item);
      return {...state,issues : newIssues};
    case 'CHANGE_ACTIVE_BUTTON':
      return {...state,activeButton : action.payload};
    case 'CHANGE_INPUT':
      return {...state,value : action.payload};
    default:
      return state;
  }
}
export default (state = [], action) => {
  switch(action.type) {
    case 'fetchList': 
      return action.payload;
    default:
      return state;
  }
}
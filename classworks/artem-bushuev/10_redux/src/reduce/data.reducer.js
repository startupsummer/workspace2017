import data from '.././data';

export default (state = [], action) => {
  console.log(action.type);
  switch(action.type){
    case '@@redux/INIT':
      return {
        data,
        state: 'open',
      } 
    case 'addIssue':
      console.log('reducer addIssue');
      console.log(state);
      return {
        ...state,
        data: [...state.data, action.item],
      };
    default:
      return state;
  }
}
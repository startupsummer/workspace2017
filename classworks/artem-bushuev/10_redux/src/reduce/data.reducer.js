import data from '.././data';

export default (state = [], action)=> {
  
  switch(action.type){
    case '@@redux/INIT':
      return{
        data,
        state: 'open',
      } 
    case 'addIssue':
      return{
        ...state,
        data: [...state.data, action.item],
      };
    case 'searchIssue':
      return{
        ...state,
        search: action.searchStr,
      };
    case 'changeCurrentState': {
      return{
        ...state,
        state: action.state,
      }
    }
    case 'chageStateIssue' :{
      let newData = [...state.data];
      for(let i = 0 ; i < newData.length; ++i){
        if(newData[i].id === action.id){
            newData[i].state = action.state === 'open'? 'closed': 'open';
        }
      }
      return{
        ...state,
        data: [...newData],
      }
    }  

    default:
      return state;
  }
}
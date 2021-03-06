export default {
  getState: (store) => store.state,

  getData: (store) => store.data,

  getCountOpen: (store)=> {
    let count = 0;
    for(let i of store.data){
      if(i.state === "open"){
        count++;
      }
    }
    return count;
  },

  getCountClose: (store)=> {
    let count = 0;
    for(let i of store.data){
      if(i.state === "closed"){
        count++;
      }
    }
    return count;
   } ,

  findById: (data,id)=> {
    for(let i = 0 ; i < data.length ; ++i){
      if(data[i].id === Number(id)){
        return data[i];
      }
    }
  },

  getSearch: (store) => store.search,

};

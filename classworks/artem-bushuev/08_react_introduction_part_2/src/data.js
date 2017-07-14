export default  { 

getCountOpen : function(){
  let count = 0;
  for(let i of this.records){
    if(i.state === "open"){
      count++;
    }
  }
  return count;
},
getCountClose : function(){
  return this.records.length - this.getCountOpen();
},
records : [
  {
    "id": 242209479,
    "title": "Best way to load a folder of static files?",
    "state": "open",
  },
  {
    "id": 242209480,
    "title": "Slow production build ",
    "state": "open",
  },
  {
    "id": 242209481,
    "title": "Support application version via env variable",
    "state": "open",
  },
  {
    "id": 242209482,
    "title": "Tree Shaking?",
    "state": "open",
  },
  {
    "id": 242209483,
    "title": "Code splitting with import promise in object",
    "state": "closed",
  },
]

}




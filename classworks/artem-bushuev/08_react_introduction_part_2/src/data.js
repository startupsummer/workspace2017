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
findById(id){
  
  for(let i = 0 ; i < this.records.length ; ++i){
    if(this.records[i].id === Number(id)){
      return this.records[i];
    }
  }
},
records : [
  {
    "id": 242209479,
    "title": "Best way to load a folder of static files?",
    "state": "open",
    "context": "Best way to load Best way to loadBest way to load",
  },
  {
    "id": 242209480,
    "title": "Slow production build ",
    "state": "open",
    "context": "production buildproduction buildproduction buildproduction build",
  },
  {
    "id": 242209481,
    "title": "Support application version via env variable",
    "state": "open",
    "context": "Support application version via envSupport app lication version via envSupport application version via env",
  },
  {
    "id": 242209482,
    "title": "Tree Shaking?",
    "state": "open",
    "context": "Tree Shaking Support application version via env",
  },
  {
    "id": 242209483,
    "title": "Code splitting with import promise in object",
    "state": "closed",
    "context": "Code splitting with Code splitting with Code splitting with",
  },
]

}




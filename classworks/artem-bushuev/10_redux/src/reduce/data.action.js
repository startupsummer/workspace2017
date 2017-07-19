export const addIssue = (item) => {
  return { type: 'addIssue',item }
}

export const searchIssue = (searchStr) => {
   return { type: 'searchIssue', searchStr } 
}

export const changeCurrentState = (state) => {
  return { type: 'changeCurrentState', state }
}

export const chageStateIssue = (state,id) => {
  return { 
    type: 'chageStateIssue',
    state,
    id,
 }
}

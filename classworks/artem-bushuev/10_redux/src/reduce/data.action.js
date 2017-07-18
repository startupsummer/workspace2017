export const addIssue = (item) => {
  return { type: 'addIssue',item }
};
export const searchIssue = (str) => {
   return { type: 'searchIssue', str } 
  }
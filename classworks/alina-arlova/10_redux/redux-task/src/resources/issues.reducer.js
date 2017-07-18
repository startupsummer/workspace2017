export default function reducer(state = [], action) {
    switch (action.type) {
      case 'fetchIssues':
        return action.payload;
      default:
        return state;
    };
};

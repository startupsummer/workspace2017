import * as fromIssues from './resources/issues.selector.js';

export default {
  getIssues: state => fromIssues.getIssues(state),
};

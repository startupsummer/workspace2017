import combineSectionReducers from 'combine-section-reducers';

import issues from './resources/issuesList/issues.reducers';
import issuesFilter from './resources/issuesFilter/issuesFilter.reducers';
import selectedIssues from './resources/selectedIssues/selectedIssues.reducers';

export default combineSectionReducers({ issues, selectedIssues, issuesFilter });


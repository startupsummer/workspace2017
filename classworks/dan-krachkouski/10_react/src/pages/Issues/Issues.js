import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import IssuesNav from './components/IssuesNav';
import IssuesHeader from './components/IssuesHeader';
import IssuesList from './components/IssuesList';

class Issues extends Component {
  constructor(props) {
    super(props);
    this.state = { tab: 'open', filter: '' };
  }

  // arguments wrapper
  openTab = (tab) => () => this.setState({ tab });

  // callback
  updateFilter = (event) => {
    this.setState({
      filter: event.target.value.toLowerCase()
    });
  };

  render() {
    const { callbacks, wraps } = this.props;
    let { data } = this.props;
    const { tab, filter } = this.state;

    data = data.filter(item => item.title.toLowerCase().startsWith(filter));

    const open = data.filter(issue => issue.state === 'open');
    const closed = data.filter(issue => issue.state === 'closed');

    return (
      <div className="container">
        <div className="issues-listing">

          <IssuesNav
            callbacks={{
              openIssue: callbacks.openIssue,
              updateFilter: this.updateFilter
            }} />

          <IssuesHeader
            tab={ tab }
            wraps={{ openTab: this.openTab }}
            count={{
              open: open.length,
              closed: closed.length
            }} />

          <IssuesList
            data={ tab === 'open' ? open : closed }
            wraps={{ setIssueState: wraps.setIssueState }} />

        </div>
      </div>);
  }
}

Issues.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  handlers: PropTypes.arrayOf(PropTypes.func)
}

export default Issues;

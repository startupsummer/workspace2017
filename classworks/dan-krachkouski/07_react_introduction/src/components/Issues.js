import React, {Component} from 'react';
import classNames from 'classnames';

import IssuesNav from './IssuesNav';
import IssuesHeader from './IssuesHeader';
import Issue from './Issue';

class Issues extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tab: 'open',
      filter: ''
    }
  }

  openTab = (tab) =>
    () => this.setState({ tab });

  updateFilter = (event) => {
    this.setState({
      filter: event.target.value.toLowerCase()
    });
  }

  render() {
    let {
      data,
      handlers: {
        openIssue,
        closeIssue,
        reopenIssue
      }
    } = this.props;

    const {
      tab,
      filter
    } = this.state;

    data = data.filter(item => item.title.toLowerCase().startsWith(filter))

    const countOpen = data.filter(issue => issue.state === 'open').length;
    const countClosed = data.filter(issue => issue.state === 'closed').length;

    return (
      <div className="container">
        <div className="issues-listing">
          <IssuesNav
            updateFilter={ this.updateFilter }
            openIssue={ openIssue }/>
          <IssuesHeader
            tab={ tab }
            openTab={ this.openTab }
            countOpen={ countOpen }
            countClosed={ countClosed }  />
          <div className="issues-listing__body">
            <ul className="issues">
              { data.filter(issue => issue.state === tab)
                  .map(issue => <Issue key={ issue.id } data={ issue } action={ tab === 'open' ? closeIssue : reopenIssue } />) }
            </ul>
          </div>
        </div>
      </div>);
  }
}

export default Issues;

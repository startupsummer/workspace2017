import React, { Component } from 'react';
import '../main.css';
import './issue-item.js';


class IssueBody extends Component {
  
  static propTypes = {
    data: React.PropTypes.array.isRequired,
    tab: React.PropTypes.string.isRequired,
  }

  constructor(props){
    super(props);
  }

  render() {
    const {
      data,
      tab,
    } = this.props;
    return (
      <div className="issues-listing__body">
        <ul className="issues">
          {this.props.data.filter((item) => {this.props.tab === item.state}).map((item) => <IssueItem state={item.state} title={item.title} issueId={item.id}/>)}
        </ul>
      </div>
    )
  }
}

export default IssueBody;
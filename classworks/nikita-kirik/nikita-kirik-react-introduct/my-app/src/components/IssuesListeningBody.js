import React, { Component } from 'react';
import IssuesItem from './IssuesItem';


class IssuesListeningBody extends Component {
  static propTypes = {
    onIssueToogle: React.PropTypes.func.isRequired,
  }

  render() {
    const data = this.props.issuesState.data;
    const listItems = data
    .filter(it => this.props.issuesType === it.state && it.title.search(new RegExp('^' + this.props.text, 'i')) != -1 )
    .map(it =>
      <IssuesItem itemData={it} onIssueToogle={this.props.onIssueToogle} />
    );

    console.log("text " +this.props.text);
    data.forEach((it)=>{
      console.log(it.title.search(new RegExp(this.props.text)) + '^ ' + it.title)
    });

    return (
      <ul className="issues">
        {listItems}
      </ul>
    )
  }
}

export default IssuesListeningBody;

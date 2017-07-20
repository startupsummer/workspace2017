import React, { Component } from 'react';
import ListingSubnav from './ListingSubnav';
import ListingHeader from './ListingHeader';
import ListingBody from './ListingBody';
import PropTypes from 'prop-types';

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openTab: 'open',
      items: this.props.items,
      initialItems: this.props.items
    }
    this.enableOpenTab = this.enableOpenTab.bind(this);
    this.enableCloseTab = this.enableCloseTab.bind(this);
    this.changeIssueState = this.changeIssueState.bind(this);
    this.addIssues = this.addIssues.bind(this);
    this.searchIssue = this.searchIssue.bind(this);
  }

  static propTypes = {
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    enableOpenTab: PropTypes.func,
    enableCloseTab: PropTypes.func,
    items: PropTypes.array,
    openTab: PropTypes.string,
    changeIssueState: PropTypes.func,
  }

  enableOpenTab() {
    this.setState({
      openTab: 'open',
    })
  }

  enableCloseTab() {
    this.setState({
      openTab: 'closed',
    })
  }

  changeIssueState(id) {
    const items = this.state.items;
    const newItems = [...items];
    newItems.forEach((item, i) => {
      if (item.id === id) {
        item.state = (item.state === 'open') ?
          item.state = 'closed'
          :
          item.state = 'open';  
      }
    });

    this.setState({
      items: newItems,
    })

  }

  addIssues() {
    this.props.allIssuesNumber(this.state.items.length + 1);
    const id = ~~(Math.random() * 1000000);
    const title = 'Something went wrong with my mind';
    const state = (Math.random() < 0.5) ? 'open' : 'closed';
    const items = this.state.items;
    const newItems = [
      ...items,
      {
        id,
        title,
        state
      }
    ]
    
    this.setState({
      items: newItems,
      initialItems: newItems,
    });
  }

  searchIssue(input) {
    const foundItems = this.state.initialItems
      .filter((item) => item.title.toLowerCase()
      .includes(input.toLowerCase()));
    
    this.setState({
      items: foundItems,
    })
  }
  
  render() {
    return (
      <div className="container">
        <div className="issues-listing">
          <ListingSubnav
            onClick={this.addIssues} 
            onChange={this.searchIssue}  
          />
          <ListingHeader
            enableOpenTab={this.enableOpenTab}
            enableCloseTab={this.enableCloseTab}
            items={this.state.items}
            openTab={this.state.openTab}
          />
          <ListingBody
            openTab={this.state.openTab}
            items={this.state.items}
            changeIssueState={this.changeIssueState}
          />
        </div>
      </div>
    )
  }
}

export default Container;

import React, { Component } from 'react';
import PageHead from './PageHead';
import Container from './Container';
import items from './data';
import PropTypes from 'prop-types';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsNumber: `${items.length}`,
    }
    this.allIssuesNumber = this.allIssuesNumber.bind(this);
  }

  static propTypes = {
    itemsNumber: PropTypes.string,
    items: PropTypes.array,
    allIssuesNumber: PropTypes.string
  }

  allIssuesNumber(number) {
    this.setState({
      itemsNumber: number,
    })
  }

  render() {
    return (
      <main className="content">
        <PageHead itemsNumber={this.state.itemsNumber} />
        <Container
          items={items}
          allIssuesNumber={this.allIssuesNumber}
        />      
      </main>
    );
  }
}

export default Main;

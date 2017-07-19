import React, { Component } from 'react';
import PageHead from './PageHead';
import Container from './Container';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
    this.getDataFromServer = this.getDataFromServer.bind(this);
  }

  componentWillMount() {
    this.getDataFromServer();
  }

  getDataFromServer() {
    fetch('https://api.github.com/repos/filipochka97/react-github/issues?' +
      'access_token=c8c50b1970bdd6f537626534103dba0a5dfb4b88&state=all')
      .then(response => response.json())
      .then(data => this.setState({
        items: data,
      }),
      );
  }

  render() {
    return (
      <main className="content">
        <PageHead itemsNumber={this.state.items.length} />
        <Container
          items={this.state.items}
          initialItems={this.state.initialItems}
          getDataFromServer={this.getDataFromServer}
        />
      </main>
    );
  }
}

export default Main;

import React, { Component } from 'react';
import './container.css';

class Container extends Component {
    static propTypes = {
        children: React.PropTypes.node.isRequired,
    }

  render() {
    return (
      <div className="container">
          {this.props.children}
      </div>
    );
  }
}

export default Container;
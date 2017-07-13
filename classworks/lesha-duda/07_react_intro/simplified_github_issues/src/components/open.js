import React, { Component } from 'react'

class Counter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const number = 2;

    return (
      <div>
        {this.props.number} {this.props.counterName}
      </div>
    )
  }
}

export default Counter;

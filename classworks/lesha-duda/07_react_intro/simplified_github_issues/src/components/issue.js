import React, { Component } from 'react'
import MyButton from './button.js';

class Issue extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <div>
          Problem is {this.props.value}
        </div>
        <div>
          <MyButton value='Close issue' handler={this.props.handler}/>
        </div>
      </div>
    )
  }
}

export default Issue;

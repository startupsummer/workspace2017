import React, { Component } from 'react'
import Issue from './issue.js';
import MyButton from './button.js';

class List extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let data = this.props.listData;
    let temp = data.map((item) => {
      if(item.state === this.props.state || this.props.state === 'all') {
        return (
          <li>
            {item.title}
            <MyButton handler={this.props.handler(item.id)} value="Close issue" id={item.id}/>
          </li>
          )
        }
      }
    );

    return (
      <div>
        <ul>
          {temp}
        </ul>
      </div>
    )
  }
}

export default List;

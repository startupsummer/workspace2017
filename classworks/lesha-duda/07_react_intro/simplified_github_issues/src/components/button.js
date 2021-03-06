import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


// function MyButton(props) {
//   return(
//     <button className={props.className} onClick = {props.handler}>
//       {props.number} {props.value}
//     </button>
//   )
// }

class MyButton extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return(
      <button className={this.props.className} onClick = {this.props.handler}>
        {this.props.number} {this.props.value}
      </button>
    )
  }
}

export default MyButton;


//react_task
//token
//d76ef4819f603e1deb94be5479f229abc13a85e9

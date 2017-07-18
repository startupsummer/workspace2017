import React, { Component } from 'react';
import Button from '../button/index.js'

class Subnav extends Component{

  makeStr = (num) => {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < num; i++){
      if(i%50 == 0){
        text+="\n"
      }
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  handleClick = () => {
    fetch('https://api.github.com/repos/i-kohan/test/issues?access_token=2ba5b37a5778956ae94876fe027bb5257daade6e',{
      method:"POST",
      body:JSON.stringify({
        title: this.makeStr(10),
        body: this.makeStr(300),
        state:"open"
      })
    })
    .then(response => response.json())
    .then(data => this.props.func(data))
  }

  changeHandle = (e) => {
    let value = e.target.value;
    let newArr = this.props.info.filter((item)=> item.title.toLowerCase().indexOf(value.toLowerCase())>-1);

    console.log(newArr);
    this.props.func(newArr);

  }

  render(){
    return(
      <div className="issues-listing__subnav">
        <div className="subnav">
          <form action="" className="subnav__search">
            <input type="text" className="subnav__search-input" placeholder="Search" onChange={this.changeHandle}/>
            <svg className="subnav__search-icon" height="16" version="1.1" viewBox="0 0 16 16" width="16">
              <path fillRule="evenodd" d="M15.7 13.3l-3.81-3.83A5.93 5.93 0 0 0 13 6c0-3.31-2.69-6-6-6S1 2.69 1 6s2.69 6 6 6c1.3 0 2.48-.41 3.47-1.11l3.83 3.81c.19.2.45.3.7.3.25 0 .52-.09.7-.3a.996.996 0 0 0 0-1.41v.01zM7 10.7c-2.59 0-4.7-2.11-4.7-4.7 0-2.59 2.11-4.7 4.7-4.7 2.59 0 4.7 2.11 4.7 4.7 0 2.59-2.11 4.7-4.7 4.7z"></path>
            </svg>
          </form>
          <Button class="btn btn-primary" text="New issue" onClick={this.handleClick}/>
        </div>
      </div>
    )
  }
}

export default Subnav;
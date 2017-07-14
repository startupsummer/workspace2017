import React, { Component } from 'react';


class Subnav extends Component {
  render() {
    return (
      <div className="issues-listing__subnav">
          <div className="subnav">
            <form className="subnav__search">
              <input className="subnav__search-input" type="text" placeholder="Search" 
                onChange = {
                  (e) => {
                   this.props.status.updatePage({search: e.target.value});
                  }
                }
              ></input>
              <svg className="subnav__search-icon" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M15.7 13.3l-3.81-3.83A5.93 5.93 0 0 0 13 6c0-3.31-2.69-6-6-6S1 2.69 1 6s2.69 6 6 6c1.3 0 2.48-.41 3.47-1.11l3.83 3.81c.19.2.45.3.7.3.25 0 .52-.09.7-.3a.996.996 0 0 0 0-1.41v.01zM7 10.7c-2.59 0-4.7-2.11-4.7-4.7 0-2.59 2.11-4.7 4.7-4.7 2.59 0 4.7 2.11 4.7 4.7 0 2.59-2.11 4.7-4.7 4.7z"></path></svg>
            </form>
            <button className="btn btn-primary" type="button" 
            onClick = {
              () => {
                let title = prompt("enter issue");
                  if(title){
                    let context = prompt('enter context');
                    if(context){
                      this.props.status.records.push(
                        {
                          "id": Math.floor((Math.random()+1)*100000000),
                          "title": title,
                          "context": context,
                          "state": "open",
                        });
                        this.props.status.updatePage();
                      console.log(title);
                    }
                }
              }
            }>
                New issue
          </button>
        </div>
      </div>
    );
  }
}
export default Subnav;
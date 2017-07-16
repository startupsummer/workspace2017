import React from 'react';

const Subnav = ({data,state,updatePage})=> {
  let search =  (e) => {
                  updatePage(
                      {
                        data,
                        state,
                        search: e.target.value,
                      }
                    );
                  }
  let addIssue =   () => {
                let title = prompt("enter issue");
                  if(title){
                    let context = prompt("enter context");
                    if(context){

                      data.records.push(
                      {
                        "id": Math.floor((Math.random()+1)*100000000),
                        "title": title,
                        "state": "open",
                        "context": context,
                      });
                     updatePage(
                        {
                          data,
                          state,
                        }
                      );
                    console.log(title);
                  }
                }
              }
    return (
      <div className="issues-listing__subnav">
          <div className="subnav">
            <form className="subnav__search">
              <input className="subnav__search-input" type="text" placeholder="Search" 
                onChange = {search}
              ></input>
              <svg className="subnav__search-icon" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M15.7 13.3l-3.81-3.83A5.93 5.93 0 0 0 13 6c0-3.31-2.69-6-6-6S1 2.69 1 6s2.69 6 6 6c1.3 0 2.48-.41 3.47-1.11l3.83 3.81c.19.2.45.3.7.3.25 0 .52-.09.7-.3a.996.996 0 0 0 0-1.41v.01zM7 10.7c-2.59 0-4.7-2.11-4.7-4.7 0-2.59 2.11-4.7 4.7-4.7 2.59 0 4.7 2.11 4.7 4.7 0 2.59-2.11 4.7-4.7 4.7z"></path></svg>
            </form>
            <button className="btn btn-primary" type="button" 
            onClick = {addIssue}>
               New issue
          </button>
        </div>
      </div>
    );}

export default Subnav;
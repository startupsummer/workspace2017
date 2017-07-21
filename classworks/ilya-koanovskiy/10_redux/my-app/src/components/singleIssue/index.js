import React from 'react';
import Button from '../button/index.js';
import { Link } from 'react-router-dom';


function Issue(props){
  return(
    <li key={props.identifier} className="issues__item" >               
      <div className="issues__statusAndTitle">
        <div className="issues__status issues__status--open">
          <svg className="issues__icon" height="16" version="1.1" viewBox="0 0 14 16" width="14">
            <path fillRule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path>
          </svg>
        </div>
        <div className="issus__title">
          <Link to={`/${props.issue.id}`} className="issues__link">{props.issue.title}</Link>
        </div>
      </div>     
      {props.issue.state === "open" && <Button class="btn issue__close" text="Close issue" onClick={props.func(props.issue.number)}/>}
    </li>  
  )   
}

export default Issue;

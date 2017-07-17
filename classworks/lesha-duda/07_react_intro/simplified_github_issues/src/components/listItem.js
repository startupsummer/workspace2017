import React, { Component } from 'react'
import Data from './../data/data'


function ListItem(props) {
  const desc = props.data.filter((e) => (e.id === parseInt(props.id)));
  return(
    <div className="container issues__title">
      <span>{desc[0].body}</span>
    </div>
  )
}

export default ListItem;

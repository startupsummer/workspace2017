import React from 'react'


function ListItem(props) {
  const desc = props.data.state.filter((e) => (e.id === parseInt(props.id, 10)));
  return(
    <div className="container issues__title">
        <span>{desc[0].body}</span>      
    </div>
  )
}

export default ListItem;

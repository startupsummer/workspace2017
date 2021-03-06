import React from 'react';
import PropTypes from 'prop-types';
import './listItem.css'


function ListItem(props) {
  const desc = props.data.state.filter((issue) => (issue.id === parseInt(props.id, 10)));
  return(
    <div className="container issues__title">
        <span>{desc[0].body}</span>      
    </div>
  )
}

ListItem.propTypes = {
  data: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired
}

export default ListItem;


import React from 'react'
import PropTypes from 'prop-types'

const ElementDescription = ({ item }) => {  
  return <div>
        <p> title: {item.title} </p>
        <p> {item.context} </p> 
        <p> state: {item.state}</p>
    </div>
}

export default ElementDescription;


ElementDescription.propTypes = {
  item: PropTypes.object.isRequired,
};
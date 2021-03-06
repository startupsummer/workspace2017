import React from 'react';
import ElementDescription from './element/ElementDescription.js'
import fromStore from '../index.selectors'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Element = ({item})=> {
  return(
    <div>
      { 
        item ? <ElementDescription item = {item} />
          : "doesn't exist"
      }
    </div>
  );}
 


 
export default connect( (store, props)=> ({
  item: fromStore.findById(store.data,props.id),
}), {
})(Element);


Element.propTypes = {
  item: PropTypes.object,
};
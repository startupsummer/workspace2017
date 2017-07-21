import React from 'react';
import PropTypes from 'prop-types';

function Description(props) {
  return (
    <div> {
      props.issues.filter((item) => ( '' + item.id ) === props.match.params.id).map((item) =>
        <div key={item.id}>
          <h1>{item.title}</h1>
          <p>{item.body}</p>
        </div>
      )
    }</div>
)
}

Description.propTypes = {
  issues: PropTypes.array,
  match: PropTypes.object,
};

export default Description;

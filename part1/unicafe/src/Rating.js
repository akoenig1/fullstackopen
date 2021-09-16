import React from 'react';

const Rating = (props) => {
  const field = props.field;
  const count = props.count;
  
  return(
    <p>{field} {count}</p>
  )
}

export default Rating;
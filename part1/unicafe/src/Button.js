import React from 'react';

const Button = (props) => {
  const rating = props.rating;
  const handleClick = props.handleClick;

  return(
    <button onClick={handleClick}>{rating}</button>
  )
}

export default Button;
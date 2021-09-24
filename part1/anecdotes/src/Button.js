import React from 'react'

const Button = ({text, handleClick}) => {
  const button = <button onClick={handleClick} >{text}</button>
  
  return(
    button
  )
}

export default Button
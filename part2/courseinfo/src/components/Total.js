import React from "react"

const Total = (props) => {
  const parts = props.parts
  const total = parts.reduce((sum, {exercises}) => {
    return sum + exercises
  }, 0)
  
  return (
    <p><strong>Number of exercises {total}</strong></p>
  )
}

export default Total
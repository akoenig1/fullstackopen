import React from 'react'

const Rating = (props) => {
  const field = props.field
  const count = props.count
  const unit = props.unit ? props.unit : ''
  
  return(
    <p>{field} {count} {unit}</p>
  )
}

export default Rating
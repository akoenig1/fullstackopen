import React from 'react'

const StatisticLine = (props) => {
  const field = props.field
  const value = props.value
  const unit = props.unit ? props.unit : ''
  
  return(
    <p>{field} {value} {unit}</p>
  )
}

export default StatisticLine
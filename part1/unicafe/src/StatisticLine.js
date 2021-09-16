import React from 'react'

const StatisticLine = (props) => {
  const field = props.field
  const value = props.value
  const unit = props.unit ? props.unit : ''
  
  return(
    <tr>
      <td>{field} </td>
      <td>{value} </td>
      <td>{unit}</td>
    </tr>
  )
}

export default StatisticLine
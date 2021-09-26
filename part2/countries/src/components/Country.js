import React from 'react'

const Country = (props) => {
  const name = props.info.name
  const capital = props.info.capital
  const region = props.info.region
  const callingCodes = props.info.callingCodes
  console.log(props.info)
  
  return(
    <div>
      <h1>{name}</h1>
      capital: {capital}
      <br/>
      region: {region}
      <h2>Calling Codes</h2>
      {
        callingCodes.map(callingCode => {
          return <li key={callingCode}>{callingCode}</li>
        })
      }
    </div>
  )
}

export default Country
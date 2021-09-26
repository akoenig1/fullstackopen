import React from 'react'

const Person = (props) => {
  const { person, removeName } = props

  return(
    <li>{person.name}: {person.number} <button onClick={() => removeName(person.id, person.name)}>Delete</button></li>
  )
}

export default Person
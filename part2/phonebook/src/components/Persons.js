import React from 'react'
import Person from './Person'

const Persons = (props) => {
  const { people, removeName } = props

  return(
    people.map(person => <Person key={person.name} person={person} removeName={removeName} />)
  )
}

export default Persons
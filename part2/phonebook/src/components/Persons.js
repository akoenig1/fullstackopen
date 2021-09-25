import React from 'react'
import Person from './Person'

const Persons = (props) => {
  const { people } = props

  return(
    people.map(person => <Person key={person.name} person={person} />)
  )
}

export default Persons
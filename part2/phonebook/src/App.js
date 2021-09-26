import React, { useState, useEffect } from 'react'
import './App.css'
import Form from './components/Form'
import Filter from './components/Filter'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchName, setSearchName ] = useState('')
  const [ searchResults, setSearchResults ] = useState([])

  const getDataHook = () => {
    personService
      .getAll()
      .then(people => {
        setPersons(people)
      })
  }

  useEffect(getDataHook, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchName(event.target.value)
    const results = persons.filter(person => 
      person.name.toLowerCase().includes(event.target.value.toLowerCase())
    )
    setSearchResults(results)
  }

  const addName = (event) => {
    event.preventDefault()
    if(persons.map(person => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const removeName = (id, name) => {
    const confirmed = window.confirm(`Delete ${name}`)
    if(confirmed) {
      personService
        .remove(id)
        .then(deletedPerson => {
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(err => {
          alert(`person does not exist on server`)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter text={searchName} handleChange={handleSearchChange} />
      <h2>Add New</h2>
      <Form 
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addName={addName}
      />
      <h2>Numbers</h2>
      <Persons people={searchName === '' ? persons : searchResults} removeName={removeName} />
    </div>
  )
}

export default App;

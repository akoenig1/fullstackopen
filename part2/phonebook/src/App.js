import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Form from './components/Form'
import Filter from './components/Filter'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchName, setSearchName ] = useState('')
  const [ searchResults, setSearchResults ] = useState([])

  const getDataHook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(res => {
        setPersons(res.data)
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
      axios
        .post('http://localhost:3001/persons', newPerson)
        .then(res => {
          setPersons(persons.concat(res.data))
          setNewName('')
          setNewNumber('')
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
      <Persons people={searchName === '' ? persons : searchResults} />
    </div>
  )
}

export default App;

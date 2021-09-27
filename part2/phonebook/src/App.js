import React, { useState, useEffect } from 'react'
import './App.css'
import Form from './components/Form'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchName, setSearchName ] = useState('')
  const [ searchResults, setSearchResults ] = useState([])
  const [ message, setMessage ] = useState(null)

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
    const foundPerson = persons.filter(person => person.name === newName)[0];
    const id = foundPerson ? foundPerson.id : null
    if(id) {
      const confirmed = window.confirm(`${newName} is already in the phonebook. Replace their old number with this one?`)
      if(confirmed) {
        const updatedPersonInfo = {
          name: newName,
          number: newNumber
        }
        personService
          .update(id, updatedPersonInfo)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : updatedPerson))
            setMessage(
              `Updated ${updatedPerson.name}'s number in phonebook`
            )
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          })
          .catch(err => {
            alert(`person does not exist on server`)
          })
        setNewName('')
        setNewNumber('')
      }
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
          setMessage(
            `Added ${returnedPerson.name} to phonebook`
          )
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
    }
  }

  const removeName = (id, name) => {
    const confirmed = window.confirm(`Delete ${name}`)
    if(confirmed) {
      personService
        .remove(id)
        .then(res => {
          setPersons(persons.filter(p => p.id !== id))
          setMessage(
            `Removed ${name} from phonebook`
          )
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
        .catch(err => {
          alert(`person does not exist on server`)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
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

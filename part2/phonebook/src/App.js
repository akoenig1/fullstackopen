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
  const [ newCountry, setNewCountry ] = useState('')
  const [ searchName, setSearchName ] = useState('')
  const [ searchCountry, setSearchCountry ] = useState('')
  const [ searchResults, setSearchResults ] = useState([])
  const [ message, setMessage ] = useState({})

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

  const handleCountryChange = (event) => {
    setNewCountry(event.target.value)
  }

  const handleNameSearchChange = (event) => {
    setSearchName(event.target.value)
    const results = persons.filter(person => 
      person.name.toLowerCase().includes(event.target.value.toLowerCase())
    )
    setSearchResults(results)
  }

  const handleCountrySearchChange = (event) => {
    setSearchCountry(event.target.value)
    const results = persons.filter(person => 
      person.country.includes(event.target.value.toUpperCase())
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
          number: newNumber,
          country: newCountry
        }
        personService
          .update(id, updatedPersonInfo)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : updatedPerson))
            setNewName('')
            setNewNumber('')
            setNewCountry('')
            setMessage({
              text: `Updated ${updatedPerson.name}'s number in phonebook`,
              type: "success"
            })
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          })
          .catch(err => {
            setMessage({
              text: err.response.data.err,
              type: "error"
            })
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          })
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        country: newCountry
      }
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNewCountry('')
          setMessage({
            text: `Added ${returnedPerson.name} to phonebook`,
            type: "success"
          })
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
        .catch(err => {
          setMessage({
            text: err.response.data.err,
            type: "error"
          })
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
          setMessage({
            text: `Removed ${name} from phonebook`,
            type: "success"
          })
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
        .catch(err => {
          setMessage({
            text: `${name} does not exist on server`,
            type: "error"
          })
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter searchCategory="name" searchText={searchName} handleChange={handleNameSearchChange} />
      <Filter searchCategory="country" searchText={searchCountry} handleChange={handleCountrySearchChange} />
      <h2>Add New</h2>
      <Form 
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        newCountry={newCountry}
        handleCountryChange={handleCountryChange}
        addName={addName}
      />
      <h2>Numbers</h2>
      <Persons people={searchName === '' && searchCountry === '' ? persons : searchResults} removeName={removeName} />
    </div>
  )
}

export default App;

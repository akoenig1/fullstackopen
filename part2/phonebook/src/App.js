import React, { useState } from 'react'
import './App.css'

const App = () => {
  const [ persons, setPersons ] = useState([
    { 
      name: 'Arto Hellas',
      number: '040-1234567'
    },
    { 
      name: 'Alex Koenig',
      number: '646-987-6543'
    },
    { 
      name: 'Simu Liu',
      number: '444-444-4444'
    },
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchName, setSearchName ] = useState('')
  const [ searchResults, setSearchResults ] = useState([])

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
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  let printArray = searchName === '' ? persons : searchResults

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        search by name: <input value={searchName} onChange={handleSearchChange} />
      </div>
      <form>
        <h2>Add New</h2>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
          <br/>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit" onClick={addName} >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        printArray.map(person => <li key={person.name} >{person.name}: {person.number}</li>)
      }
    </div>
  )
}

export default App;

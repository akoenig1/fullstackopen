import React from 'react'

const Form = (props) => {
  const {
    newName,
    handleNameChange,
    newNumber,
    handleNumberChange,
    newCountry,
    handleCountryChange,
    addName
  } = props

  return(
    <form>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
        <br/>
        number: <input value={newNumber} onChange={handleNumberChange} />
        <br />
        country: <input value={newCountry} onChange={handleCountryChange} />
      </div>
      <div>
        <button type="submit" onClick={addName} >add</button>
      </div>
    </form>
  )
}

export default Form
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'
import './App.css'

function App() {
  const [countries, setCountries] = useState([])
  const [searchText, setSearchText] = useState('')
  const [searchResults, setSearchResults] = useState([])
  
  const getCountriesHook = () => {
    axios
      .get("http://api.countrylayer.com/v2/all?access_key=19b4a0a75f3a834268a1251243ce5621")
      .then(res => {
        setCountries(res.data)
      })
  }

  useEffect(getCountriesHook, [])

  const handleSearchChange = (event) => {
    setSearchText(event.target.value)
    const results = countries.filter(country => 
      country.name.toLowerCase().includes(event.target.value.toLowerCase())
    )
    setSearchResults(results)
  }

  const handleShowButtonClick = (country) => {
    setSearchResults([country])
  }

  const refineSearchMessage = <p>Too many matches, refine search</p>
  const matchingCountryList = searchResults.map(country => {
    return <li key={country.alpha3Code}>{country.name} <button onClick={() => handleShowButtonClick(country)}>show</button></li>
  })
  let printedResult = refineSearchMessage

  if(searchResults.length === 1) {
    printedResult = <Country info={searchResults[0]} />
  } else if(searchResults.length < 10) {
    printedResult = matchingCountryList
  }
  
  return (
    <div>
      find countries: <input value={searchText} onChange={handleSearchChange} />
      {printedResult}
    </div>
  );
}

export default App;

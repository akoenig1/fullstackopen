import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = (props) => {
  const name = props.info.name
  const capital = props.info.capital
  const region = props.info.region
  const callingCodes = props.info.callingCodes
  const [weather, setWeather] = useState({})
  
  const getWeatherHook = () => {
    axios.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_API_KEY}&query=${capital}`)
    .then (res => {
      setWeather(res.data.current)
    })
  }

  useEffect(getWeatherHook, [capital])

  return(
    <div>
      <h1>{name}</h1>
      capital: {capital}
      <br/>
      region: {region}
      <h2>Calling Codes</h2>
      {
        callingCodes.map(callingCode => {
          return <li key={callingCode}>{callingCode}</li>
        })
      }
      <h2>Weather in {capital}</h2>
      temperature: {weather.temperature} Celsius
      <br/>
      {
        weather.weather_icons  
          ? weather.weather_icons.map((icon, i) => {
              return <img key={i} alt="weather-icon" src={icon} />
            })
          : null
      }
      <br/>
      wind: {weather.wind_speed} MPH {weather.wind_dir}
    </div>
  )
}

export default Country
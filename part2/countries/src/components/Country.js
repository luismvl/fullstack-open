import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = ({ weather: { current } }) => {
    
    return (
        <div>
            <p>Temperature: {current.temperature}</p>
            <img src={current.weather_icons[0]} alt='weather icon' />
            <p>Wind: {current.wing_speed} kmph direction {current.wing_dir}</p>
        </div>
    )    
}

const Country = ({ country }) => {
    const [weather, setWeather] = useState(null)
    const API_KEY = process.env.REACT_APP_API_KEY

    useEffect(() => {
        axios.get(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${country.capital}`)
            .then(res => setWeather(res.data))
    })
    console.log('weather', weather)
    return (
        <div>
            <h2>{country.name}</h2>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>

            <h3>Spoken languages</h3>
            <ul>
                {country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
            </ul>
            <img width={200} src={country.flag} alt="flag" />

            <h3>Weather in {country.capital}</h3>
            {weather ? <Weather weather={weather} /> : <p>Not found</p>}

        </div>
    )
}

export default Country
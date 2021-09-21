import React, { useState } from 'react'
import Country from './Country'

const CountryItem = ({ country, setShowCountry }) => {
    return (
        <div>
            <p>{country.name} <button onClick={() => setShowCountry(country)}>show</button></p> 
        </div>
    )
}

const CountriesList = ({ countries }) => {
    const [showCountry, setShowCountry] = useState('')

    return (
        <div>
            {countries.map(country =>
                <CountryItem key={country.name} country={country} setShowCountry={setShowCountry} />)}

            {showCountry ? <Country country={showCountry} /> : ''}
        </div>
    )
}

export default CountriesList
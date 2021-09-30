import React, { useState } from 'react'
import Country from './Country'

const CountriesList = ({ countries }) => {
    const [showCountry, setShowCountry] = useState('')
    console.log('countries', countries)

    return (
        <div>
            {
                countries.map(country =>
                    <p key={country.name}>{country.name}
                        <button onClick={() => setShowCountry(country)}>show</button>
                    </p>
                )
            }

            {showCountry ? <Country country={showCountry} /> : ''}
        </div>
    )
}

export default CountriesList
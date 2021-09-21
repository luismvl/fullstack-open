import React from "react"
import CountriesList from './CountriesList'
import Country from './Country'

const Content = ({ countries }) => {
    if (countries.length > 10)
        return <p>Too many matches, specify another filter</p>

    if (countries.length === 0)
        return <p>No matches found, specify another filter</p>

    if (countries.length === 1)
        return <Country country={countries[0]} />

    return <CountriesList countries={countries} />
}

export default Content

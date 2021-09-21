import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Content from './components/Content'

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(res => {
        setCountries(res.data)
      })
  }, [])

  const countriesToShow = countries
    .filter(country => country.name.toLowerCase().indexOf(filter.toLowerCase()) > -1)

  return (
    <div>
      find countries <input onChange={e => setFilter(e.target.value)} />
      <Content countries={countriesToShow} />
    </div>
  )
}

export default App
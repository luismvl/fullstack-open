import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3001/persons')
    .then(response => setPersons(response.data))
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const personsToShow = persons.filter(
    person => person.name.toLowerCase().indexOf(filter.toLowerCase()) > -1)

  const addPerson = (e) => {
    e.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }

    if (persons.some(person => person.name === newPerson.name)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    setPersons([...persons, newPerson])
    setNewName('')
    setNewNumber('')
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setFilter={setFilter} />

      <h3>Add new</h3>
      <PersonForm addPerson={addPerson} setNewName={setNewName} newName={newName} 
      setNewNumber={setNewNumber} newNumber={newNumber} />
      
      <h3>Numbers</h3>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App
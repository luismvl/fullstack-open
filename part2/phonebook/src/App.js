import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  useEffect(() => {
    personService.getAll().then(initialData => setPersons(initialData))
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({ text: '', type: '' })

  const personsToShow = persons.filter(
    person => person.name.toLowerCase().indexOf(filter.toLowerCase()) > -1)

  const addPerson = (e) => {
    e.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    const personExist = persons.find(p => p.name === newPerson.name)
    const message = `${newName} is already added to phonebook, replace the old number with a new one?`
    if (personExist && window.confirm(message)) {
      personService.update(personExist.id, newPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== returnedPerson.id ? p : returnedPerson))
          setNotification({ text: `Updated ${newName}`, type: 'success' })
          setTimeout(() => setNotification({ text: '', type: '' }), 5000)
        })
        .catch(() => {
          setNotification({ text: `Information of ${newName} has already been remove from server`, type: 'error' })
          setTimeout(() => setNotification({ text: '', type: '' }), 5000)
          setPersons(persons.filter(p => p.id !== personExist.id))
        })
    } else {
      personService.create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNotification({ text: `Added ${returnedPerson.name}`, type: 'succes' })
          setTimeout(() => setNotification({ text: '', type: '' }), 5000)
        })
    }

    setNewName('')
    setNewNumber('')
  }

  const deletePerson = id => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          setNotification({ text: `Deleted ${person.name}`, type: 'succes' })
          setTimeout(() => setNotification({ text: '', type: '' }), 5000)
        })
        .catch(() => {
          setNotification({ text: `Information of ${person.name} has already been remove from server`, type: 'error' })
          setTimeout(() => setNotification({ text: '', type: '' }), 5000)
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.text} type={notification.type} />

      Search
      <Filter setFilter={setFilter} />

      <h3>Add new</h3>
      <PersonForm addPerson={addPerson} setNewName={setNewName} newName={newName}
        setNewNumber={setNewNumber} newNumber={newNumber} />

      <h3>Numbers</h3>
      <Persons persons={personsToShow} handleDelete={deletePerson} />
    </div>
  )
}

export default App
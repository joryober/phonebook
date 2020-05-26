import React, { useState, useEffect } from 'react'
import PersonForm from "./PersonForm"
import Filter from "./Filter"
import Persons from "./Persons"
import Notification from "./Notification"
import phonebookService from "./services/phonebook"

const App = () => {
    const [persons, setPersons] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [filteredName, setFilteredName] = useState('')
    const [successMessage, setSuccessMessage] = useState(null)

    useEffect(() => {
      phonebookService
      .getAll()
        .then(response => setPersons(response.data))
    }, [])

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => 
        {
        setNewNumber(event.target.value)
        }

    const handleFilter = (event) => {
        setFilteredName(event.target.value.toLowerCase())
    }
  const handleSubmit = (event) => {
    event.preventDefault()

    if(persons.filter(person => person.name === newName).length > 0){
        
        const result = (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
        console.log(event.target.name)

        if (result){
          const updateId = persons.find(person => person.name === newName)["id"]
          const updatePerson = persons.find(person => person["id"] === updateId)
          phonebookService
            .update(updateId, {...updatePerson, number: newNumber})
            .then(response => {
              setPersons(persons.map(person => person["id"] !== updateId ? person : response.data))
            })
            setNewName("")
            setNewNumber("")
            setSuccessMessage(
              `Number for '${updatePerson.name}' updated`
            )
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000) 
            return
      } else {
        return
      }
    }


  
  

    const newContact = {
      name: newName,
      number: newNumber
    }
    phonebookService
    .create(newContact)
    .then(response => {
      setPersons(persons.concat(response.data))
      setNewName("")
      setNewNumber("")
    })
    setPersons([
        ...persons,
        {
            name: newName,
            number: newNumber
        }
    ])
    setSuccessMessage(
      `Added ${newName}`
    )
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000) 
    setNewName("")
    setNewNumber("")
  }

  const filteredPersons = persons.filter(person => person["name"].toLowerCase().slice(0,filteredName.length)===filteredName)

  const handleDelete = (event) => {
    (window.confirm(`Delete ${event.target.name}?`))
    &&
    (phonebookService
    .remove(event.target.value)
    .then(response => {
      phonebookService
      .getAll()
        .then(response => setPersons(response.data))
      
    }))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} />
      <Filter handleFilter={handleFilter}/>
      <PersonForm handleSubmit={handleSubmit} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete}/>
    </div>
  )
}

export default App
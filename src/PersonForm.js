import React from "react"

const PersonForm = ({handleSubmit, newName, handleNameChange, newNumber, handleNumberChange}) => {
    return(
        <div>
        <h2>Add new contact:</h2>
    <form name={newName} number={newNumber} onSubmit={handleSubmit}>
        <div>
            name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
            number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
    </div>
    )
}

export default PersonForm
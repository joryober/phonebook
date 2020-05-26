import React from "react"

const Persons = ({filteredPersons, handleDelete}) => {
    return (
        <div>
            {filteredPersons.map(person => {
                return (
                        <div key={person["id"]}>
                        {person["name"]} {person["number"]} {" "}          
                        <button value={person["id"]} name={person["name"]}onClick={handleDelete}>
                             delete
                        </button>
                        </div>
                )
            }
            )
    }
        </div>
       
    )
}

export default Persons
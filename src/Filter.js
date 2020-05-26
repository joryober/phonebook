import React from "react"

const Filter =  ({handleFilter}) => {
    return(
        <div>
            <h2>Filter by name:</h2>
            <input onChange={handleFilter}/>
        </div>
    )
}

export default Filter
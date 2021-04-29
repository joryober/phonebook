import React from "react";

const Persons = ({ persons, newSearch }) => {
  return (
    <div>
      {persons
        .filter((person) =>
          newSearch.length > 0
            ? person.name.toLowerCase().includes(newSearch)
            : true
        )
        .map((person) => (
          <li style={{ listStyleType: "none" }} key={person.name}>
            {person.name} {person.number}
          </li>
        ))}
    </div>
  );
};

export default Persons;

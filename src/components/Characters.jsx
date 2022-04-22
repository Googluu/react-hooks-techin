import React, { useState, useEffect } from 'react';

const Characters = () => {
    const [ characters, setCharacters ] = useState([]);

    useEffect(() => {
        fetch('https://rickandmortyapi.com/api/character/')
        .then(Response => Response.json())
        .then(data => setCharacters(data.results));
    }, []);

    return (
        <div className='Characters'>
            {characters.map(characters => (
                <h2 key={characters.id}>{characters.name}</h2>
            ))}
        </div>
    );
}

export default Characters;
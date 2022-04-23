import React, { useState, useReducer, useMemo, useRef, useCallback } from 'react';
import Search from './Search';
import useCharaters from '../hooks/useCharaters';

const initialState = {
    favorites: []
}

const API = 'https://rickandmortyapi.com/api/character/'

const favoriteReducer = ( state, action ) => {
    switch (action.type) {
        case 'ADD_TO_FAVORITE':
            return {
                ...state,
                favorites: [...state.favorites, action.payload]
            };
            default:
                return state;
    }
}

const Characters = () => {
    const [ favorites, dispatch ] = useReducer(favoriteReducer, initialState);
    const [ search, setSearch ] = useState('');
    const searchInput = useRef(null);

    const characters = useCharaters(API);

    const handleClick = favorite => {
        dispatch({ type: 'ADD_TO_FAVORITE', payload: favorite })
    }

    // const handleSearch = () => {
    //     setSearch(searchInput.current.value)
    // }

    const handleSearch = useCallback(() => {
        setSearch(searchInput.current.value);
    }, [])

    // const filteredUsers = characters.filter((user) => {
    //     return (
    //     user.name.toLowerCase().includes(search.toLowerCase());
    //     )}

    const filteredUsers = useMemo(() =>
    characters.filter((user) => {
      return user.name.toLowerCase().includes(search.toLowerCase());
    }),
    [characters, search]
  )

    return (
        <div className='Characters'>

            {favorites.favorites.map(favorite => (
                <li key={favorite.id}>
                    { favorite.name }
                </li>
            ))}

                <Search search={search} searchInput={searchInput} handleSearch={handleSearch} />

            {filteredUsers.map(characters => (
                <div className='item' key={characters.id}>
                <h2>{characters.name}</h2>
                <button type='button' onClick={() => handleClick(characters)}>
                    Add a favorites
                </button>
                </div>
            ))}
        </div>
    );
}

export default Characters;
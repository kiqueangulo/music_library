import React, { useContext } from "react";
import { SearchContext } from '../context/SearchContext.js';

function SearchBar() {
    let { term, handleSearch } = useContext(SearchContext);

    return (
        <form>
            <input
                ref={term}
                type='text'
                placeholder='Search for a song here'
                onChange={e => handleSearch(e, term.current.value)}
            />
            <input type='submit' />
        </form>
    )
};

export default SearchBar;
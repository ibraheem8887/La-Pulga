import React from 'react';

const Search = ({search,setSearch}) => {
    return (
        <div>
            <form className='flex justify-end'>
                <input className=' rounded border-gray-200 border ' type="search" name="search" id="search" value={search}
        onChange={(e) => setSearch(e.target.value)}/>
            </form>
        </div>
    );
}

export default Search;

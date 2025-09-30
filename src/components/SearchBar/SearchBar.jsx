import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, applyFilters } from '../../store/slices/moviesSlice';
import './SearchBar.css';
import { ReactComponent as SearchIcon } from '../../assets/search.svg';

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector(state => state.movies.searchQuery);

  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
    dispatch(applyFilters());
  };

  return (
    <div className="search-bar">
       <SearchIcon className="search-icon" />
      <input
        type="text"
        placeholder="Search movies"
        value={searchQuery}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGenreFilter, setSortBy, applyFilters } from '../../store/slices/moviesSlice';
import './FilterPanel.css'

const FilterPanel = () => {
  const dispatch = useDispatch();
  const { selectedGenre, sortBy, items } = useSelector(state => state.movies);
  
  const genres = React.useMemo(() => {
    const allGenres = new Set();
    items.forEach(movie => {
      if (Array.isArray(movie.genre)) {
        movie.genre.forEach(g => allGenres.add(g));
      } else {
        allGenres.add(movie.genre);
      }
    });
    return ['All', ...Array.from(allGenres).sort()];
  }, [items]);

  const handleGenreChange = (e) => {
    dispatch(setGenreFilter(e.target.value));
    dispatch(applyFilters());
  };

  const handleSortChange = (e) => {
    dispatch(setSortBy(e.target.value));
    dispatch(applyFilters());
  };

  return (
    <div className="filter-panel">
      <select value={selectedGenre} onChange={handleGenreChange}>
        <option value="All">All Genres</option>
        {genres.filter(g => g !== 'All').map(genre => (
          <option key={genre} value={genre}>{genre}</option>
        ))}
      </select>
      
      <select value={sortBy} onChange={handleSortChange}>
        <option value="title">Sort by Title</option>
        <option value="rating">Sort by Rating</option>
        <option value="year">Sort by Year</option>
      </select>
    </div>
  );
};

export default FilterPanel;
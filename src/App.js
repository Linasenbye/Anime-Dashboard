import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './store';
import { setMovies, applyFilters } from './store/slices/moviesSlice';
import { movies } from './data/movies';
import SearchBar from './components/SearchBar/SearchBar'
import FilterPanel from './components/FilterPanel/FilterPanel';
import MovieCard from './components/MovieCard/MovieCard ';
import MovieDetails from './components/MovieDetails/MovieDetails';
import './App.css';


const Dashboard = () => {
  const dispatch = useDispatch();
  const { filteredItems, favorites } = useSelector(state => state.movies);
  const [showFavorites, setShowFavorites] = React.useState(false);

  useEffect(() => {
    dispatch(setMovies(movies));
    dispatch(applyFilters());
  }, [dispatch]);

  const displayItems = showFavorites
    ? filteredItems.filter(movie => favorites.includes(movie.id))
    : filteredItems;

  return (
    <div className="dashboard">
      <header>
        <div className="controls">
          <SearchBar />
          <FilterPanel />
          <button
            onClick={() => setShowFavorites(!showFavorites)}
            className={showFavorites ? 'active' : ''}
          >
            {showFavorites ? 'Show All' : 'Show Favorites'} ({favorites.length})
          </button>
        </div>
      </header>

      <main className={displayItems.length > 0 ? "movie-grid" : "empty-container"}>
        {displayItems.length > 0 ? (
          displayItems.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">🎬</div>
            <h3>No movies found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </main>
      <MovieDetails />
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
}

export default App;
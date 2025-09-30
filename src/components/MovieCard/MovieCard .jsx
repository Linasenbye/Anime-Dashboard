import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite, setSelectedMovie } from '../../store/slices/moviesSlice';
import './MovieCard.css'
import { ReactComponent as HeartFilled } from '../../assets/filled.svg';
import { ReactComponent as HeartOutline } from '../../assets/outline.svg';
import { ReactComponent as RatingStar } from '../../assets/star.svg';


const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.movies.favorites);
  const isFavorite = favorites.includes(movie.id);

  const displayGenres = Array.isArray(movie.genre) 
    ? movie.genre.slice(0, 3).join(', ')
    : movie.genre;

  return (
    <div className="movie-card">
      <div className="movie-card-poster">
        <img src={movie.poster} alt={movie.title} />
      </div>
      
      <div className="movie-card-content">
        <h3>{movie.title}</h3>
        
        <div className="movie-info">
          <span className="movie-genre">{displayGenres}</span>
          <div className="movie-meta">
            <span className="movie-rating"> <RatingStar/> {movie.rating}</span>
            <span>{movie.year}</span>
            <span>{movie.duration}</span>
          </div>
        </div>
        
        <div className="card-actions">
          <button 
            className="btn-details"
            onClick={() => dispatch(setSelectedMovie(movie))}
          >
            Details
          </button>
          <button 
            className={`btn-favorite ${isFavorite ? 'active' : ''}`}
            onClick={() => dispatch(toggleFavorite(movie.id))}
          >
            {isFavorite ? <HeartFilled/> : <HeartOutline />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
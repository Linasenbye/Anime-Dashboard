import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedMovie } from '../../store/slices/moviesSlice';
import './MovieDetails.css'
import { ReactComponent as RatingStar } from '../../assets/star.svg';

const MovieDetails = () => {
  const dispatch = useDispatch();
  const selectedMovie = useSelector(state => state.movies.selectedMovie);

  if (!selectedMovie) return null;

  const genreDisplay = Array.isArray(selectedMovie.genre)
    ? selectedMovie.genre.join(', ')
    : selectedMovie.genre;

  return (
    <div className="modal-overlay" onClick={() => dispatch(setSelectedMovie(null))}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button
          className="close-btn"
          onClick={() => dispatch(setSelectedMovie(null))}
        >
          ×
        </button>

        <div className="modal-header">
          <img src={selectedMovie.poster} alt={selectedMovie.title} />
          <div className="modal-header-overlay"></div>
        </div>

        <div className="modal-body">
          <h2 className="modal-title">{selectedMovie.title}</h2>

          <div className="modal-meta">
            <div className="modal-meta-item">
              <strong>Genre:</strong> {genreDisplay}
            </div>
            <div className="modal-meta-item modal-rating">
              <RatingStar /> {selectedMovie.rating}
            </div>
          </div>

          <div className="modal-meta">
            <div className="modal-meta-item">
              <strong>Year:</strong> {selectedMovie.year}
            </div>
            <div className="modal-meta-item">
              <strong>Duration:</strong> {selectedMovie.duration}
            </div>
          </div>

          <div className="modal-meta">
            <div className="modal-meta-item">
              <strong>Director:</strong> {selectedMovie.director}
            </div>
          </div>

          <p className="modal-description">{selectedMovie.description}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
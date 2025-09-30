import { createSlice } from '@reduxjs/toolkit';

const loadFavoritesFromStorage = () => {
    try {
        const saved = localStorage.getItem('movieFavorites');
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
};

const saveFavoritesToStorage = (favorites) => {
    try {
        localStorage.setItem('movieFavorites', JSON.stringify(favorites));
    } catch (error) {
        console.error('Error saving favorites:', error);
    }
};

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        items: [],
        filteredItems: [],
        favorites: loadFavoritesFromStorage(),
        searchQuery: '',
        selectedGenre: 'All',
        sortBy: 'title',
        selectedMovie: null,
    },
    reducers: {
        setMovies: (state, action) => {
            state.items = action.payload;
            state.filteredItems = action.payload;
        },

        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },

        setGenreFilter: (state, action) => {
            state.selectedGenre = action.payload;
        },

        setSortBy: (state, action) => {
            state.sortBy = action.payload;
        },

        toggleFavorite: (state, action) => {
            const movieId = action.payload;
            const index = state.favorites.indexOf(movieId);

            if (index >= 0) {
                state.favorites.splice(index, 1);
            } else {
                state.favorites.push(movieId);
            }

            saveFavoritesToStorage(state.favorites);
        },

        setSelectedMovie: (state, action) => {
            state.selectedMovie = action.payload;
        },

        applyFilters: (state) => {
            let filtered = [...state.items];

            if (state.searchQuery.trim()) {
                const query = state.searchQuery.toLowerCase().trim();
                filtered = filtered.filter(movie =>
                    movie.title.toLowerCase().includes(query) ||
                    movie.director.toLowerCase().includes(query)
                );
            }

            if (state.selectedGenre !== 'All') {
                filtered = filtered.filter(movie => {
                    if (Array.isArray(movie.genre)) {
                        return movie.genre.includes(state.selectedGenre);
                    }
                    return movie.genre === state.selectedGenre;
                });
            }

            filtered.sort((a, b) => {
                switch (state.sortBy) {
                    case 'rating':
                        return b.rating - a.rating;
                    case 'year':
                        return b.year - a.year;
                    case 'title':
                    default:
                        return a.title.localeCompare(b.title);
                }
            });

            state.filteredItems = filtered;
        },
    },
});

export const {
    setMovies,
    setSearchQuery,
    setGenreFilter,
    setSortBy,
    toggleFavorite,
    setSelectedMovie,
    applyFilters,
} = moviesSlice.actions;

export default moviesSlice.reducer;
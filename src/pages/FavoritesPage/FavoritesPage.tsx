import React, { useEffect, useState } from 'react';


import { fetchMovieDetails } from '../../api/tmdb';
import { getFavorites } from '../../utils/localStorage';
import MovieList from '../../components/MovieList/MovieList';
import styles from './FavoritesPage.module.css';

import { Movie } from '../../types/movie';


const FavoritesPage: React.FC = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      const favoriteIds = getFavorites();
      if (favoriteIds.length === 0) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const movies = await Promise.all(
          favoriteIds.map(id => fetchMovieDetails(id))
        );
        setFavoriteMovies(movies);
      } catch (err) {
        setError('Failed to fetch favorite movies');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <h1>Your Favorite Movies</h1>
      {favoriteMovies.length > 0 ? (
        <MovieList movies={favoriteMovies} />
      ) : (
        <div className={styles.empty}>
          You haven't added any movies to your favorites yet.
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
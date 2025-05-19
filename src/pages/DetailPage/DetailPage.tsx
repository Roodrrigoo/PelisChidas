import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovieDetails, fetchRecommendedMovies} from '../../api/tmdb';
import { isFavorite, toggleFavorite } from '../../utils/localStorage';
import MovieList from '../../components/MovieList/MovieList';

import { Movie } from '../../types/movie';
import styles from './DetailPage.module.css';



const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorite, setFavorite] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate('/');
      return;
    }

    const movieId = parseInt(id);
    if (isNaN(movieId)) {
      navigate('/not-found');
      return;
    }

    setFavorite(isFavorite(movieId));

    const fetchData = async () => {
      try {
        setLoading(true);
        const [movieDetails, recommended] = await Promise.all([
          fetchMovieDetails(movieId),
          fetchRecommendedMovies(movieId),
        ]);
        setMovie(movieDetails);
        setRecommendedMovies(recommended.results.slice(0, 8));
      } catch (err) {
        setError('Failed to fetch movie details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleToggleFavorite = () => {
    if (!movie) return;
    toggleFavorite(movie.id);
    setFavorite(!favorite);
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!movie) return <div className={styles.error}>Movie not found</div>;

  return (
    <div className={styles.container}>
      <div className={styles.movieDetail}>
        <div className={styles.posterContainer}>
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : '/placeholder.png'
            }
            alt={movie.title}
            className={styles.poster}
          />
          <button
            onClick={handleToggleFavorite}
            className={`${styles.favoriteButton} ${
              favorite ? styles.favorite : ''
            }`}
          >
            {favorite ? '❤️ Remove from Favorites' : '♡ Add to Favorites'}
          </button>
        </div>
        <div className={styles.details}>
          <h1 className={styles.title}>
            {movie.title} ({movie.release_date.substring(0, 4)})
          </h1>
          <div className={styles.rating}>
            ⭐ {movie.vote_average.toFixed(1)}/10
          </div>
          <p className={styles.overview}>{movie.overview}</p>
          <div className={styles.meta}>
            <p>
              <strong>Release Date:</strong> {movie.release_date}
            </p>
          </div>
        </div>
      </div>
      {recommendedMovies.length > 0 && (
        <div className={styles.recommended}>
          <h2>Recommended Movies</h2>
          <MovieList movies={recommendedMovies} />
        </div>
      )}
    </div>
  );
};

export default DetailPage;
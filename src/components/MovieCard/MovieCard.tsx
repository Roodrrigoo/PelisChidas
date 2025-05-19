import React from 'react';
import { Movie } from '../../types/movie';
import styles from './MovieCard.module.css';
import { useNavigate } from 'react-router-dom';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const navigate = useNavigate();
  
  return (
    <div 
      className={styles.card} 
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : '/placeholder.png'
        }
        alt={movie.title}
        className={styles.poster}
      />
      <div className={styles.info}>
        <h3 className={styles.title}>{movie.title}</h3>
        <p className={styles.rating}>⭐ {movie.vote_average.toFixed(1)}</p>
        <p className={styles.year}>
          {movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
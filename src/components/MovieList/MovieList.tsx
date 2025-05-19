import React from 'react';
import { Movie } from '../../types/movie';

import MovieCard from '../MovieCard/MovieCard';
import styles from './MovieList.module.css';

interface MovieListProps {
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <div className={styles.list}>
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
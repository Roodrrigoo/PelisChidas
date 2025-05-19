import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../../api/tmdb';
import MovieList from '../../components/MovieList/MovieList';

import styles from './HomePage.module.css';

import { Movie } from '../../types/movie';
const HomePage: React.FC = () => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        setLoading(true);
        const [popular, topRated, nowPlaying] = await Promise.all([
          fetchMovies('popular', 1),
          fetchMovies('top_rated', 1),
          fetchMovies('now_playing', 1),
        ]);
        setPopularMovies(popular.results.slice(0, 8));
        setTopRatedMovies(topRated.results.slice(0, 8));
        setNowPlayingMovies(nowPlaying.results.slice(0, 8));
      } catch (err) {
        setError('Failed to fetch movies');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllMovies();
  }, []);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h2>Popular Movies</h2>
        <MovieList movies={popularMovies} />
      </section>
      <section className={styles.section}>
        <h2>Top Rated Movies</h2>
        <MovieList movies={topRatedMovies} />
      </section>
      <section className={styles.section}>
        <h2>Now Playing</h2>
        <MovieList movies={nowPlayingMovies} />
      </section>
    </div>
  );
};

export default HomePage;
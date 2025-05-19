import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { fetchMovies } from '../../api/tmdb';
import MovieList from '../../components/MovieList/MovieList';
import Pagination from '../../components/Pagination/Pagination';

import styles from './MoviesPage.module.css';
import { Movie ,MoviesResponse} from '../../types/movie';


const MoviesPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!category) {
      navigate('/');
      return;
    }

    const validCategories = ['popular', 'top_rated', 'now_playing'];
    if (!validCategories.includes(category)) {
      navigate('/not-found');
      return;
    }

    const fetchCategoryMovies = async () => {
      try {
        setLoading(true);
        const data: MoviesResponse = await fetchMovies(category, currentPage);
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (err) {
        setError('Failed to fetch movies');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryMovies();
  }, [category, currentPage, navigate]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const getCategoryTitle = () => {
    switch (category) {
      case 'popular':
        return 'Popular Movies';
      case 'top_rated':
        return 'Top Rated Movies';
      case 'now_playing':
        return 'Now Playing';
      default:
        return 'Movies';
    }
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{getCategoryTitle()}</h1>
      <MovieList movies={movies} />
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default MoviesPage;
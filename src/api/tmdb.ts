const API_KEY = '1e0929aaa24b7ef538d70ff9a479ca71';
const BASE_URL = 'https://api.themoviedb.org/3';

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
  vote_average: number;
  release_date: string;
  backdrop_path: string | null;
}

export interface MoviesResponse {
  results: Movie[];
  page: number;
  total_pages: number;
}

export const fetchMovies = async (endpoint: string, page = 1): Promise<MoviesResponse> => {
  const response = await fetch(
    `${BASE_URL}/movie/${endpoint}?api_key=${API_KEY}&language=en-US&page=${page}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }
  return response.json();
};

export const fetchMovieDetails = async (id: number): Promise<Movie> => {
  const response = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch movie details');
  }
  return response.json();
};

export const fetchRecommendedMovies = async (id: number): Promise<MoviesResponse> => {
  const response = await fetch(
    `${BASE_URL}/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch recommended movies');
  }
  return response.json();
};
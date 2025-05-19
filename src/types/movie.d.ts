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
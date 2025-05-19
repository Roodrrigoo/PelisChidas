const FAVORITES_KEY = 'favorite_movies';

export const getFavorites = (): number[] => {
  if (typeof window === 'undefined') return [];
  const favorites = localStorage.getItem(FAVORITES_KEY);
  return favorites ? JSON.parse(favorites) : [];
};

export const toggleFavorite = (movieId: number): void => {
  const favorites = getFavorites();
  const newFavorites = favorites.includes(movieId)
    ? favorites.filter(id => id !== movieId)
    : [...favorites, movieId];
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
};

export const isFavorite = (movieId: number): boolean => {
  return getFavorites().includes(movieId);
};
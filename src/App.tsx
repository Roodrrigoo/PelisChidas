import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import MoviesPage from './pages/MoviesPage/MoviesPage';
import DetailPage from './pages/DetailPage/DetailPage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import styles from './App.module.css';

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <Navbar />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies/:category" element={<MoviesPage />} />
          <Route path="/movie/:id" element={<DetailPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
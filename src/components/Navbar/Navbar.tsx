import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>Movie App</Link>
      <div className={styles.links}>
        <Link to="/" className={styles.link}>Home</Link>
        <Link to="/movies/popular" className={styles.link}>Popular</Link>
        <Link to="/movies/top-rated" className={styles.link}>Top Rated</Link>
        <Link to="/movies/now-playing" className={styles.link}>Now Playing</Link>
        <Link to="/favorites" className={styles.link}>Favorites</Link>
      </div>
    </nav>
  );
};

export default Navbar;
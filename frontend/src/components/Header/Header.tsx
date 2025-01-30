import React from "react";
import styles from "./index.module.css"; // Import CSS module

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1>My App</h1>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li><a href="/home" className={styles.navLink}>Home</a></li>
          <li><a href="/about" className={styles.navLink}>About</a></li>
          <li><a href="/contact" className={styles.navLink}>Contact</a></li>
        </ul>
      </nav>
      <div className={styles.authButtons}>
        <button className={styles.loginButton} ><a href="/login" >Login</a></button>
        <button className={styles.signupButton}><a href="/signup" >Sign Up</a></button>
      </div>
    </header>
  );
};

export default Header;

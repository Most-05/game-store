import React from 'react';
import styles from "./ROVHome.module.css"; 
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <nav className={styles.navbar2}>
        <Link to="/">Home</Link>
        <Link to="/ROVShop">Shop</Link>
      </nav>

      <div className={styles.header1}>
        <h1><strong>Welcome To Legendary ROV Shop</strong></h1>
        <p>Shop for purchasing products in ROV ieie</p>
      </div>
    </>
  );
}

export default Home;

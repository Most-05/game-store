import React from 'react';
import styles from "./ROVHome.module.css"; 
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <nav className={styles.navbar2}>
        <Link to="/Home">Home</Link>
        <Link to="/ROVShop">Shop</Link>
      </nav>

      <div className={styles.header1}>
        <h1><strong>Welcome To Legendary ROV Shop</strong></h1>
        <p>ร้านขายสกินและไอเทมสำหรับเกม RoV</p>
        {/* ปุ่มพาเข้าร้านโดยตรง เดิมทางเข้าร้านมีแค่ลิงก์ Shop
            ในแถบเมนูเล็ก ๆ ด้านบนเท่านั้น */}
        <Link to="/ROVShop" className={styles.enterShop}>เข้าสู่ร้านค้า</Link>
      </div>
    </>
  );
}

export default Home;

import React from 'react';
import { Link } from "react-router-dom";
import styles from "./ROVHome.module.css";

// หน้าแรกของร้าน ROV
//
// เดิมคอมโพเนนต์นี้ชื่อ Home เฉย ๆ ซึ่งชนกับ src/pages/Home.js ที่เป็น
// หน้าแรกของทั้งเว็บ เวลาไล่โค้ดแล้วเห็นคำว่า Home จึงแยกไม่ออกว่าหมายถึงตัวไหน
// ตั้งชื่อให้ตรงกับชื่อไฟล์และ route ที่ประกาศไว้ใน App.js
function ROVHome() {
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

export default ROVHome;

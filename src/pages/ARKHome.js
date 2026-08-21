import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BalanceContext } from "../BalanceContext"; // นำเข้าคอนเท็กซ์ยอดเงิน
import styles from "./ARKHome.module.css"; // นำเข้า CSS Module

const ARKHome = () => {
  const { balance, decreaseBalance } = useContext(BalanceContext); // ดึงยอดเงินจากคอนเท็กซ์

  // ฟังก์ชันสำหรับลดยอดเงิน
  const handleDecreaseBalance = () => {
    decreaseBalance(100); // ลด 100 Coins เมื่อคลิก
  };

  return (
    <div className={styles.ARKHome1} id="header">
      <div className={styles.Header}>
        <h1 className="text-4xl font-bold mb-4">ARK Survival Evolved</h1>
        <Link to="/">HOME</Link>
        <a href="#header"> MENU</a>
        <a href="#store-section" className="cursor-pointer hover:underline">SHOP</a>
        {/* แสดงยอดเงินที่มี */}
        <p>Coin: {balance} 🪙</p> {/* แสดงยอดเงินจาก context พร้อมอิโมจิ 🪙 */}

      </div>

      <div className={styles.container}>
        <div className={styles.Ad1}>
          <img src="/image/ARK-Screenn-AD.png" alt="ARK Screenshot" />
        </div>
      </div>

      <div className={styles.shopSection} id="store-section">
        <h1 className="text1">Store</h1>

        <div className={styles.shopGrid}>
          <Link to="/dino-pack" className={styles.shopItem1} state={{ scrollTo: "Ad1" }}>
            <img src="/image/REX.jpg" alt="Dino Pack" />
            <p className={styles.itemName}>Dino Pack</p>
          </Link>

          <Link to="/blueprint" className={styles.shopItem2} state={{ scrollTo: "Ad1" }}>
            <img src="/image/Blueprint.png" alt="Blueprint" />
            <p className={styles.itemName}>Blueprint</p>
          </Link>

          <Link to="/equipment" className={styles.shopItem3} state={{ scrollTo: "Ad1" }}>
            <img src="/image/equipment.png" alt="Equipment" />
            <p className={styles.itemName}>Equipment</p>
          </Link>
        </div>

        <div className={styles.shopGrid}>
          <Link to="/artifacts" className={styles.shopItem4} state={{ scrollTo: "Ad1" }}>
            <img src="/image/artifacts.jpg" alt="Artifacts" />
            <p className={styles.itemName}>Artifacts</p>
          </Link>

          <Link to="/cave" className={styles.shopItem5} state={{ scrollTo: "Ad1" }}>
            <img src="/image/CAVE.webp" alt="CAVE" />
            <p className={styles.itemName}>CAVE</p>
          </Link>

          <Link to="/structures" className={styles.shopItem6} state={{ scrollTo: "Ad1" }}>
            <img src="/image/Structures.jpg" alt="Structures" />
            <p className={styles.itemName}>Structures</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ARKHome;

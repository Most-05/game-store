import React, { useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { BalanceContext } from "../BalanceContext"; // นำเข้าคอนเท็กซ์ยอดเงิน
import { cardButtonProps } from "./arkCardProps";
import styles from "./ARKHome.module.css"; // ใช้ CSS Module

const DinoPackPage = () => {
  const navigate = useNavigate();
  const ad1Ref = useRef(null); // ใช้ ref สำหรับ Ad1
  const location = useLocation(); // ใช้ useLocation() เพื่อเข้าถึง URL state
  const { balance } = useContext(BalanceContext); // ดึงยอดเงินจากคอนเท็กซ์

  // ใช้ useEffect สำหรับ scroll เมื่อ component mount
  useEffect(() => {
    if (location.state?.scrollTo === "Ad1" && ad1Ref.current) {
      ad1Ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  // ฟังก์ชันในการ handle การซื้อ
  const handlePurchase = (itemName, price) => {
    navigate("/checkout", { state: { itemName, price } });
  };

  return (
    <div className={styles.ARKHome4} id="header">
      <div className={styles.Header}>
        <h1>ARK Survival Evolved</h1>
        <Link to="/ARKHome">HOME</Link>
        <a href="#Ad1"> MENU</a>
        <a href="#dinopack">SHOP</a>
        {/* แสดงยอดเงินที่อัปเดต */}
        <p>Coins: {balance} 🪙</p> {/* แสดงยอดเงินจาก context พร้อมอิโมจิ 🪙 */}
      </div>

      <div className={styles.container}>
        <div className={styles.Ad1} id="Ad1" ref={ad1Ref}>
          <img src="/image/Addino2.jpg" alt="ARK Screenshot" />
        </div>
      </div>

      <div className={styles.dinopack}>
        <h1 id="dinopack">DinoPack</h1>
        <div className={styles.shopSection2}>
          <div className={styles.dinoItem1} {...cardButtonProps(() => handlePurchase("Giga", 5000))}>
            <img src="/image/giga.jpg" alt="Giga" />
            <h3>Giga</h3>
            <p>Price: 5000 Coins</p>
          </div>

          <div className={styles.dinoItem1} {...cardButtonProps(() => handlePurchase("Triceratops", 3500))}>
            <img src="/image/triceratops.jpg" alt="Triceratops" />
            <h3>Triceratops</h3>
            <p>Price: 3500 Coins</p>
          </div>
        </div>

        <div className={styles.shopSection2}>
          <div className={styles.dinoItem1} {...cardButtonProps(() => handlePurchase("Deinonychus", 6000))}>
            <img src="/image/deinonychus.jpg" alt="Deinonychus" />
            <h3>Deinonychus</h3>
            <p>Price: 6000 Coins</p>
          </div>

          <div className={styles.dinoItem1} {...cardButtonProps(() => handlePurchase("Reaper", 45000))}>
            <img src="/image/REAPER.jpg" alt="Reaper" />
            <h3>Reaper</h3>
            <p>Price: 45000 Coins</p>
          </div>
        </div>

        <div className={styles.shopSection2}>
          <div className={styles.dinoItem1} {...cardButtonProps(() => handlePurchase("Griffin", 6000))}>
            <img src="/image/Griffin.jpg" alt="griffin" />
            <h3>Griffin</h3>
            <p>Price: 6000 Coins</p>
          </div>

          <div className={styles.dinoItem1} {...cardButtonProps(() => handlePurchase("Basilick", 6000))}>
            <img src="/image/Basilick.jpg" alt="Bas" />
            <h3>Basilick</h3>
            <p>Price: 6000 Coins</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DinoPackPage;

import React, { useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { BalanceContext } from "../BalanceContext"; // นำเข้าคอนเท็กซ์ยอดเงิน
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
        <h1 className="text-4xl font-bold mb-4">ARK Survival Evolved</h1>
        <Link to="/ARKHome">HOME</Link>
        <a href="#Ad1"> MENU</a>
        <a href="#dinopack" className="cursor-pointer hover:underline">SHOP</a>
        {/* แสดงยอดเงินที่อัปเดต */}
        <p>Coins: {balance} 🪙</p> {/* แสดงยอดเงินจาก context พร้อมอิโมจิ 🪙 */}
      </div>

      <div className={styles.container}>
        <div className={styles.Ad1} id="Ad1" ref={ad1Ref}>
          <img src="/image/Addino2.jpg" alt="ARK Screenshot" />
        </div>
      </div>

      <div className={styles.dinopack}>
        <h1 className="text-2xl font-semibold" id="dinopack">DinoPack</h1>
        <div className={styles.shopSection2}>
          <div className={styles.dinoItem1} onClick={() => handlePurchase("Giga", 5000)}>
            <img src="/image/giga.jpg" alt="Giga" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold">Giga</h3>
            <p className="text-lg">Price: 5000 Coins</p>
          </div>

          <div className={styles.dinoItem1} onClick={() => handlePurchase("Triceratops", 3500)}>
            <img src="/image/triceratops.jpg" alt="Triceratops" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold">Triceratops</h3>
            <p className="text-lg">Price: 3500 Coins</p>
          </div>
        </div>

        <div className={styles.shopSection2}>
          <div className={styles.dinoItem1} onClick={() => handlePurchase("Deinonychus", 6000)}>
            <img src="/image/deinonychus.jpg" alt="Deinonychus" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold">Deinonychus</h3>
            <p className="text-lg">Price: 6000 Coins</p>
          </div>

          <div className={styles.dinoItem1} onClick={() => handlePurchase("Reaper", 45000)}>
            <img src="/image/REAPER.jpg" alt="Reaper" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold">Reaper</h3>
            <p className="text-lg">Price: 45000 Coins</p>
          </div>
        </div>

        <div className={styles.shopSection2}>
          <div className={styles.dinoItem1} onClick={() => handlePurchase("Griffin", 6000)}>
            <img src="/image/Griffin.jpg" alt="griffin" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold">Griffin</h3>
            <p className="text-lg">Price: 6000 Coins</p>
          </div>

          <div className={styles.dinoItem1} onClick={() => handlePurchase("Basilick", 6000)}>
            <img src="/image/Basilick.jpg" alt="Bas" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold">Basilick</h3>
            <p className="text-lg">Price: 6000 Coins</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DinoPackPage;

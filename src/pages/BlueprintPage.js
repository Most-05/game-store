import React, { useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { BalanceContext } from "../BalanceContext"; // นำเข้าคอนเท็กซ์ยอดเงิน
import styles from "./ARKHome.module.css"; // ใช้ CSS Module

const BlueprintPage = () => {
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
    <div className={styles.ARKHome3}>
      <div className={styles.Header}>
        <h1 className="text-4xl font-bold mb-4">ARK Survival Evolved</h1>
        <Link to="/ARKHome">HOME</Link>
        <a href="#header"> MENU</a>
        <a href="#store-section">Shop</a>
        {/* แสดงยอดเงินที่อัปเดต */}
        <p>Coins: {balance} 🪙</p> {/* แสดงยอดเงินจาก context พร้อมอิโมจิ 🪙 */}
      </div>

      <div className={styles.container}>
        <div ref={ad1Ref} className={styles.Ad1} id="Ad1">
          <img src="/image/wallpaperart2.jpg" alt="ARK Screenshot" />
        </div>
      </div>

      <div className={styles.blueprint}>
        <h1 className="text-2xl font-semibold">Blueprint</h1>
        <div className={styles.shopSection3} id="store-section">
          <div className={styles.ARTItem} onClick={() => handlePurchase("Flak Chestpiece", 10000)}>
            <img src="/image/FlakChestpiece.jpg" alt="Flak Chestpiece" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold">Blueprint: Flak Chestpiece</h3>
            <p className="text-lg">Price: 10000 Coins</p>
          </div>

          <div className={styles.ARTItem} onClick={() => handlePurchase("Flak Leggings", 25000)}>
            <img src="/image/FlakLeggings.jpg" alt="FlakLeggings" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold">Blueprint: Flak Leggings</h3>
            <p className="text-lg">Price: 25000 Coins</p>
          </div>
        </div>

        <div className={styles.shopSection3}>
          <div className={styles.ARTItem} onClick={() => handlePurchase("Flak Gauntlets", 60000)}>
            <img src="/image/FlakGauntlets.jpg" alt="FlakGauntlets" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold">Blueprint: Flak Gauntlets</h3>
            <p className="text-lg">Price: 60000 Coins</p>
          </div>

          <div className={styles.ARTItem} onClick={() => handlePurchase("Flak Boots", 45000)}>
            <img src="/image/FlakBoots.jpg" alt="FlakBoots" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold">Blueprint: Flak Boots</h3>
            <p className="text-lg">Price: 45000 Coins</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlueprintPage;

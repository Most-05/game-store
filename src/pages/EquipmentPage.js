import React, { useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { BalanceContext } from "../BalanceContext"; // นำเข้าคอนเท็กซ์ยอดเงิน
import styles from "./ARKHome.module.css"; // ใช้ CSS Module

const EquipmentPage = () => {
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
    <div className={styles.equipmentPageBody} id="header"> {/* ใช้คลาสที่กำหนดใน CSS Module */}
      <div className={styles.Header}>
        <h1 className="text-4xl font-bold mb-4">ARK Survival Evolved</h1>
        <Link to="/ARKHome">HOME</Link>
        <a href="#header"> MENU</a>
        <a href="#store-section">Shop</a>
        {/* แสดงยอดเงินจาก context */}
        <p>Coins: {balance} 🪙</p> {/* แสดงยอดเงินจาก context พร้อมอิโมจิ 🪙 */}
      </div>

      <div className={styles.container}>
        <div ref={ad1Ref} className={styles.Ad1}>
          <img src="/image/Adequip2.jpg" alt="ARK Screenshot" />
        </div>
      </div>

      <div className={styles.equip}>
        <h1 className="text-2xl font-semibold">Equipment</h1>
        <div className={styles.shopSection4} id="store-section">
  
          <div className={styles.ARTItem4} onClick={() => handlePurchase("metalpick", 5000)}>
            <img src="/image/metalpick.jpg" alt="metalpick" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold">Ascendant metal pick</h3>
            <p className="text-lg">Price: 5000 Coins</p>
          </div>
  
          <div className={styles.ARTItem4} onClick={() => handlePurchase("actionshotgun", 5000)}>
            <img src="/image/actionshotgun.jpg" alt="actionshotgun" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold">Action Shotgun</h3>
            <p className="text-lg">Price: 5000 Coins</p>
          </div>
  
        </div>
  
        <div className={styles.shopSection2}>
  
          <div className={styles.ARTItem4} onClick={() => handlePurchase("longneckrifle", 60000)}>
            <img src="/image/longneckrifle.jpg" alt="longneckrifle" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold">Ascendant Longneck Rifle</h3>
            <p className="text-lg">Price: 60000 Coins</p>
          </div>
  
          <div className={styles.ARTItem4} onClick={() => handlePurchase("fabricatedsniperrifle", 45000)}>
            <img src="/image/fabricatedsniperrifle.jpg" alt="fabricatedsniperrifle" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold">Ascendant Fabricated Sniper Rifle</h3>
            <p className="text-lg">Price: 45000 Coins</p>
          </div>
  
        </div>
      </div>
    </div>
  );
};

export default EquipmentPage;

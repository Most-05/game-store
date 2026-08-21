import React, { useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { BalanceContext } from "../BalanceContext"; // นำเข้าคอนเท็กซ์ยอดเงิน
import styles from "./ARKHome.module.css"; // ใช้ CSS Module

const CavePage = () => {
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
    <div className={styles.ARKHome5} id="header">
      <div className={styles.Header}>
        <h1 className="text-4xl font-bold mb-4">ARK Survival Evolved</h1>
        <Link to="/ARKHome">HOME</Link>
        <a href="#header">MENU</a>
        <a href="#store-section" className="cursor-pointer hover:underline">Shop</a>
        {/* แสดงยอดเงินที่อัปเดต */}
        <p>Coins: {balance} 🪙</p>
      </div>

      <div className={styles.container}>
        <div className={styles.Ad1} id="Ad1" ref={ad1Ref}>
          <img src="/image/Adcave2.jpg" alt="ARK Screenshot" />
        </div>
      </div>

      <div className={styles.cave}>
        <h1 className="text-2xl font-semibold">CAVE</h1>
        
        {/* ร้านค้า */}
        <div className={styles.shopSection2} id="store-section">
          {[{ name: "Pearl Cave", price: 10000, image: "/image/Pearlcave.jpg" }, { name: "Ice Cave", price: 25000, image: "/image/Icecave.jpg" }]
            .map((item) => (
              <div key={item.name} className={styles.dinoItem1} onClick={() => handlePurchase(item.name, item.price)}>
                <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-md mb-4" />
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-lg">Price: {item.price} Coins</p>
              </div>
            ))}
        </div>

        {/* รายการถ้ำอื่น ๆ */}
        <div className={styles.shopSection2}>
          {[{ name: "Luna Cave", price: 60000, image: "/image/Lunacave.jpg" }, { name: "Church Cave", price: 45000, image: "/image/Churchcave.jpg" }]
            .map((item) => (
              <div key={item.name} className={styles.dinoItem1} onClick={() => handlePurchase(item.name, item.price)}>
                <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-md mb-4" />
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-lg">Price: {item.price} Coins</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CavePage;

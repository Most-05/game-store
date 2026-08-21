import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./ARKHome.module.css"; // นำเข้า CSS Module

const StructuresPage = () => {
  const navigate = useNavigate();
  
  const handlePurchase = (itemName, price) => {
    navigate("/checkout", { state: { itemName, price } });
  };

  const ad1Ref = useRef(null); // สร้าง ref สำหรับ Ad1
  
  const location = useLocation(); // ใช้ useLocation() แทน location
  if (location.state?.scrollTo === "Ad1" && ad1Ref.current) {
    ad1Ref.current.scrollIntoView({ behavior: "smooth" });
  }
  
  return (
    <div className={styles.structuresPageBody} id="header"> {/* ใช้คลาสที่กำหนดใน CSS Module */}
      <div className={styles.Header}>
        <h1 className="text-4xl font-bold mb-4">ARK Survival Evolved</h1>
        <Link to="/ARKHome">HOME</Link>
        <a href="#header">MENU</a>
        <a href="#store-section">Shop</a>
        <p>Coin🪙: </p>
      </div>

      <div className={styles.container}>
        <div className={styles.Ad1}>
          <img src="/image/wall5.jpg" alt="ARK Screenshot" />
        </div>
      </div>

      <div className={styles.struct}>
        <h1 className="text-2xl font-semibold">Structures</h1>
        <div className={styles.shopSection5} id="store-section">
  
          <div className={styles.structItem1} onClick={() => handlePurchase("IndustrialForge", 45000)}>
            <img src="/image/IndustrialForge.jpg" alt="IndustrialForge" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold">Industrial Forge</h3>
            <p className="text-lg">Price: 10000 Coins</p>
          </div>
  
          <div className={styles.structItem1} onClick={() => handlePurchase("IndustrialCooker", 45000)}>
            <img src="/image/IndustrialCooker.jpg" alt="IndustrialCooker" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold">Industrial Cooker</h3>
            <p className="text-lg">Price: 10000 Coins</p>
          </div>
        </div>
  
        <div className={styles.shopSection5}>
          <div className={styles.structItem1} onClick={() => handlePurchase("Fabricator", 60000)}>
            <img src="/image/Fabricator.jpg" alt="Fabricator" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold">Fabricator</h3>
            <p className="text-lg">Price: 60000 Coins</p>
          </div>
  
          <div className={styles.structItem1} onClick={() => handlePurchase("TekTransmitter", 60000)}>
            <img src="/image/TekTransmitter.jpg" alt="TekTransmitter" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold">Tek Transmitter</h3>
            <p className="text-lg">Price: 60000 Coins</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StructuresPage;

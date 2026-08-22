import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { BalanceContext } from "../BalanceContext"; // ยอดเงินกลางของทั้งเว็บ
import styles from "./ARKHome.module.css"; // นำเข้า CSS Module

// รายการสินค้าเก็บเป็นข้อมูลชุดเดียว ราคาที่แสดงกับราคาที่หักเงินจึงมาจากตัวเลขเดียวกัน
//
// เดิมสองอย่างนี้เขียนแยกกัน คือราคาที่แสดงอยู่ใน <p> ส่วนราคาที่หักจริง
// เป็นตัวเลขที่ส่งเข้า handlePurchase ทำให้มันหลุดจากกันได้โดยไม่มีอะไรเตือน
// และมันหลุดไปแล้วจริง ๆ กับสองรายการแรก
const structures = [
  { name: "IndustrialForge", label: "Industrial Forge", price: 10000, image: "/image/IndustrialForge.jpg" },
  { name: "IndustrialCooker", label: "Industrial Cooker", price: 10000, image: "/image/IndustrialCooker.jpg" },
  { name: "Fabricator", label: "Fabricator", price: 60000, image: "/image/Fabricator.jpg" },
  { name: "TekTransmitter", label: "Tek Transmitter", price: 60000, image: "/image/TekTransmitter.jpg" },
];

const StructuresPage = () => {
  const navigate = useNavigate();
  const { balance } = useContext(BalanceContext);

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
        <h1>ARK Survival Evolved</h1>
        <Link to="/ARKHome">HOME</Link>
        <a href="#header">MENU</a>
        <a href="#store-section">Shop</a>
        <p>Coins: {balance} 🪙</p>
      </div>

      <div className={styles.container}>
        <div className={styles.Ad1}>
          <img src="/image/wall5.jpg" alt="ARK Screenshot" />
        </div>
      </div>

      <div className={styles.struct}>
        <h1>Structures</h1>

        <div className={styles.shopSection5} id="store-section">
          {structures.slice(0, 2).map((item) => (
            <div key={item.name} className={styles.structItem1} onClick={() => handlePurchase(item.name, item.price)}>
              <img src={item.image} alt={item.label} />
              <h3>{item.label}</h3>
              <p>Price: {item.price} Coins</p>
            </div>
          ))}
        </div>

        <div className={styles.shopSection5}>
          {structures.slice(2).map((item) => (
            <div key={item.name} className={styles.structItem1} onClick={() => handlePurchase(item.name, item.price)}>
              <img src={item.image} alt={item.label} />
              <h3>{item.label}</h3>
              <p>Price: {item.price} Coins</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StructuresPage;

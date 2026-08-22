import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { BalanceContext } from "../BalanceContext"; // ยอดเงินกลางของทั้งเว็บ
import styles from "./ARKHome.module.css"; // นำเข้า CSS Module

const artifacts = [
  { name: "ArtifactofMassive", label: "Artifact of Massive", price: 5000, image: "/image/ArtifactofMassive.jpg" },
  { name: "ArtifactCunning", label: "Artifact of Cunning", price: 5000, image: "/image/ArtifactCunning.jpg" },
  { name: "ArtifactofChaos", label: "Artifact of Chaos", price: 5000, image: "/image/ArtifactofChaos.jpg" },
  { name: "ArtifactGrowth", label: "Artifact of Growth", price: 5000, image: "/image/ArtifactGrowth.jpg" },
];

const ArtifactsPage = () => {
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
    <div className={styles.ARKHome2} id="header">
      <div className={styles.Header}>
        <h1 className="text-4xl font-bold mb-4">ARK Survival Evolved</h1>
        <Link to="/ARKHome">HOME</Link>
        <a href="#header">MENU</a>
        <a href="#store-section">Shop</a>
        <p>Coins: {balance} 🪙</p>
      </div>

      <div className={styles.container}>
        <div className={styles.Ad1} id="Ad1" ref={ad1Ref}>
          <img src="/image/wallpaper1.jpg" alt="ARK Screenshot" />
        </div>
      </div>

      <div className={styles.art}>
        <h1 className="text-2xl font-semibold">Artifacts</h1>

        <div className={styles.shopSection6} id="store-section">
          {artifacts.slice(0, 2).map((item) => (
            <div key={item.name} className={styles.ARTItem6} onClick={() => handlePurchase(item.name, item.price)}>
              <img src={item.image} alt={item.label} className="w-full h-40 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-semibold">{item.label}</h3>
              <p className="text-lg">Price: {item.price} Coins</p>
            </div>
          ))}
        </div>

        <div className={styles.shopSection6}>
          {artifacts.slice(2).map((item) => (
            <div key={item.name} className={styles.ARTItem6} onClick={() => handlePurchase(item.name, item.price)}>
              <img src={item.image} alt={item.label} className="w-full h-40 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-semibold">{item.label}</h3>
              <p className="text-lg">Price: {item.price} Coins</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtifactsPage;

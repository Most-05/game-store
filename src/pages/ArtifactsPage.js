import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./ARKHome.module.css"; // นำเข้า CSS Module

const ArtifactsPage = () => {
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
     <div className={styles.ARKHome2} >
    <div className={`${styles.minHeightScreen} ${styles.bgGray} ${styles.flex} ${styles.flexCol} ${styles.itemsCenter} ${styles.p6}`} id="header">
      <div className={styles.Header}>
        <h1 className={styles.title}>ARK Survival Evolved</h1>
        <Link to="/ARKHome" className={styles.link}>HOME</Link>
        <a href="#header" className={styles.link}>MENU</a>
        <a href="#store-section" className={styles.link}>Shop</a>
        <p className={styles.coin}>Coin🪙: 10000</p>
      </div>

      <div className={styles.container}>
        <div className={styles.ad1}>
          <img src="/image/wallpaper1.jpg" alt="ARK Screenshot" />
        </div>
      </div>

      <div className={styles.art}>
        <h1 className={styles.artTitle}>Artifacts</h1>
        <div className={styles.shopSection6} id="store-section">
          <div className={styles.ARTItem6} onClick={() => handlePurchase("ArtifactofMassive", 5000)}>
            <img src="/image/ArtifactofMassive.jpg" alt="ArtifactofMassive" className={styles.artImage} />
            <h3 className={styles.artName}>Artifact of Massive</h3>
            <p className={styles.artPrice}>Price: 5000 Coins</p>
          </div>

          <div className={styles.ARTItem6} onClick={() => handlePurchase("ArtifactCunning", 5000)}>
            <img src="/image/ArtifactCunning.jpg" alt="ArtifactCunning" className={styles.artImage} />
            <h3 className={styles.artName}>Artifact of Cunning</h3>
            <p className={styles.artPrice}>Price: 5000 Coins</p>
          </div>
        </div>

        <div className={styles.shopSection6}>
          <div className={styles.ARTItem6} onClick={() => handlePurchase("ArtifactofChaos", 5000)}>
            <img src="/image/ArtifactofChaos.jpg" alt="ArtifactofChaos" className={styles.artImage} />
            <h3 className={styles.artName}>Artifact of Chaos</h3>
            <p className={styles.artPrice}>Price: 5000 Coins</p>
          </div>

          <div className={styles.ARTItem6} onClick={() => handlePurchase("ArtifactGrowth", 5000)}>
            <img src="/image/ArtifactGrowth.jpg" alt="ArtifactGrowth" className={styles.artImage} />
            <h3 className={styles.artName}>Artifact of Growth</h3>
            <p className={styles.artPrice}>Price: 5000 Coins</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ArtifactsPage;

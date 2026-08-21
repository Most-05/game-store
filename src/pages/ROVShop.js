import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import style from "./ROVShop.module.css"; // ใช้ CSS Modules

function ROVShop() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [coins, setCoins] = useState(50000); // เริ่มต้นที่ 50,000 Coins

  // ใช้ useRef เพื่อเข้าถึง .navbar
  const navbarRef = useRef(null);

  useEffect(() => {
    // เช็คว่า navbarRef.current ไม่เป็น null แล้วจึงซ่อน navbar
    if (navbarRef.current) {
      navbarRef.current.style.display = "none";
    }

    return () => {
      // ฟังก์ชัน clean-up เพื่อแสดง navbar อีกครั้งเมื่อออกจากหน้านี้
      if (navbarRef.current) {
        navbarRef.current.style.display = "flex";
      }
    };
  }, []); // useEffect จะทำงานหลังจากคอมโพเนนต์โหลดเสร็จ

  // เปิด Popup ยืนยันการซื้อ
  function confirmPurchase(product) {
    setSelectedProduct(product);
  }

  // ปิด Popup
  function closePopup() {
    setSelectedProduct(null);
  }

  // เมื่อกดยืนยันซื้อสินค้า
  function handleConfirm() {
    if (selectedProduct) {
      const price = parseInt(selectedProduct.price.replace("฿", "").replace(",", ""), 10);

      if (coins >= price) {
        setCoins(coins - price); // หัก Coins
        setSelectedProduct(null);
        setTimeout(() => {
          alert(`คุณได้ซื้อ ${selectedProduct.name} เรียบร้อยแล้ว!`);
        }, 100);
      } else {
        alert("Coins ไม่เพียงพอ!");
      }
    }
  }

  return (
    <div className={style['shop-container']}>
      {/* แสดง Coins ที่มุมขวาบน */}
      <div className={style['coins-display']}>
        💰 Coins: {coins.toLocaleString()}
      </div>

      {/* ปุ่ม ☰ ที่มุมซ้าย */}
      <div className={style['menuicon']} onClick={() => setMenuOpen(!menuOpen)}>☰</div>

      {/* เมนู Sidebar */}
      <div ref={navbarRef} className={`${style.sidebar} ${menuOpen ? style.open : ""}`}>
        <button className={style['close-btn']} onClick={() => setMenuOpen(false)}>✖</button>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
        <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
      </div>

      <h1>We've gathered together some of the coolest Skins for you.</h1>
      <h2>All Skins</h2>

      {/* ตารางสินค้า */}
      <div className={style['product-grid']}>
        {products.map((product) => (
          <div
            className={style['product-card']}
            key={product.id}
            onClick={() => confirmPurchase(product)}
          >
            <img src={product.image} alt={product.name} />
            <h3 className={style['product-name']}>{product.name}</h3>
            <p className={style['product-price']}>{product.price}</p>
          </div>
        ))}
      </div>

      {/* Popup ยืนยันการซื้อ */}
      {selectedProduct && (
        <div className={style['popup-overlay']}>
          <div className={style['popup-box']}>
            <h2>ยืนยันการซื้อ</h2>
            <p>คุณต้องการซื้อ <strong>{selectedProduct.name}</strong> ในราคา {selectedProduct.price} หรือไม่?</p>
            <div className={style['popup-buttons']}>
              <button className={style['confirm-btn']} onClick={handleConfirm}>✅ ยืนยัน</button>
              <button className={style['cancel-btn']} onClick={closePopup}>❌ ยกเลิก</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// รายการสินค้า
const products = [
  { id: 1, name: "Violet", price: "฿9,900", image: "https://img.4gamers.com.tw/ckfinder-th/image2/auto/2022-07/Dimension%20Breaker%20Lauriel-220719-172649.jpg" },
  { id: 3, name: "Lauriel", price: "฿5,300", image: "https://www.gamingdose.com/wp-content/uploads/2018/11/divine-grace-lauriel-featured.jpg" },
  { id: 4, name: "Yorn", price: "฿3,400", image: "https://cdn-webth.garenanow.com/webth/cdn/gth/rov/non-events/official/349f2e6ff541c1c8398fbd66e9c63fdf.jpg" },
  { id: 5, name: "Veres", price: "฿1,500", image: "https://img.4gamers.com.tw/ckfinder-th/image2/auto/2023-08/ROV_NEWSKIN_VERES-230820-150041.jpeg?versionId=hfMPew9.fgRc71fuH0XxtZ91hB.5.WI3" },
  { id: 6, name: "Toro", price: "฿1,600", image: "https://img.4gamers.com.tw/ckfinder-th/image2/auto/2023-08/ROV_NEWSKIN_TORO-230820-150219.jpeg?versionId=2XXWJEH6Sp5ApTfyKvRmLwHK6dZrzn5O" },
  { id: 7, name: "Tel'Annas", price: "฿700", image: "https://img.4gamers.com.tw/ckfinder-th/image2/auto/2023-08/ROV_NEWSKIN_TEL'ANNAS-230820-150248.jpeg?versionId=5rVmWhBOmV0Qxatkae6tKmnRQK_a1rSr" },
  { id: 8, name: "Paine", price: "฿1,888", image: "https://img.4gamers.com.tw/ckfinder-th/image2/auto/2023-08/ROV_NEWSKIN_PAINE-230820-150326.jpeg?versionId=NSxTmh0EpWUrI8srJQNxYCVR8HDNj1IC" },
  { id: 9, name: "Bright", price: "฿1,909", image: "https://img.4gamers.com.tw/ckfinder-th/image2/auto/2023-08/ROV_NEWSKIN_BRIGHT-230820-150428.jpeg?versionId=DFjQ8UajGdG2pHyWMnxjB2hTNf0znR7s" },
  { id: 10, name: "Ilumia", price: "฿7,000", image: "https://cdn.oneesports.co.th/cdn-data/sites/3/2024/12/LINE_ALBUM_281167_241204_4-600x369.jpg" },
  { id: 11, name: "Ryoma", price: "฿2,100", image: "https://www.animenachrichten.de/wp-content/uploads/2021/09/maxresdefault-2-1-696x392.jpg" },
  { id: 12, name: "Nakroth", price: "฿10,200", image: "https://cdn.oneesports.co.th/cdn-data/sites/3/2024/12/LINE_ALBUM_281167_241204_2-600x369.jpg" },
  { id: 13, name: "Yena", price: "฿17990", image: "https://cdn.oneesports.co.th/cdn-data/sites/3/2024/12/LINE_ALBUM_281167_241204_1-600x369.jpg" },
  { id: 14, name: "Kahlii", price: "฿2,400", image: "https://s.isanook.com/ga/0/ud/217/1085681/rov_3.png?ip/resize/w728/q80/png" },
  { id: 15, name: "Airi", price: "฿7900", image: "https://s.isanook.com/ga/0/ud/217/1085681/rov_20.png?ip/resize/w728/q80/png" },
  { id: 16, name: "Liliana", price: "฿2000", image: "https://s.isanook.com/ga/0/ud/217/1085681/rov_19.jpg?ip/resize/w728/q80/jpg" },
  { id: 2, name: "Airi", price: "฿1,000", image: "https://cdn-webth.garenanow.com/webth/cdn/gth/rov/non-events/official/2ec7d3f94cb40ec8623d7e87fc703d51.png" },
];

export default ROVShop;

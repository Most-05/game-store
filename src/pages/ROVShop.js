import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { BalanceContext } from "../BalanceContext"; // ยอดเงินกลางของทั้งเว็บ
// ตัวช่วยทำให้กล่องที่กดได้ทำตัวเป็นปุ่มจริง ไฟล์นี้ตั้งชื่อตามร้าน ARK
// เพราะเขียนขึ้นตอนแก้ร้านนั้นก่อน แต่เนื้อในไม่ผูกกับร้านไหนเลย ใช้ร่วมกันได้
import { cardButtonProps } from "./arkCardProps";
import styles from "./ROVShop.module.css"; // ใช้ CSS Modules

// รายการสินค้า
//
// รูปทุกใบเก็บไว้ในโปรเจกต์เองที่ public/image/rov/ ไม่ได้ดึงจากเว็บคนอื่นแล้ว
// เดิมทั้ง 16 ใบเป็นลิงก์ตรงไปยังเซิร์ฟเวอร์ของเว็บข่าวเกมเจ็ดเจ้า
// ซึ่งเป็นของคนอื่นทั้งหมด เขาย้ายหรือลบเมื่อไรรูปเราก็หายทันทีโดยไม่รู้ตัว
// และมันเกิดขึ้นแล้วจริงกับสามใบที่เซิร์ฟเวอร์ปลายทางตอบ 504 มาตลอด
//
// ราคาเก็บเป็นตัวเลขล้วน ไม่ใช่ข้อความอย่าง "฿9,900" แบบเดิม
// ด้วยเหตุผลสองข้อ
//   1. ของเดิมเขียนรูปแบบไม่เหมือนกัน บางตัวมีลูกน้ำ บางตัวไม่มี
//      หน้าเว็บจึงแสดง ฿9,900 ปนกับ ฿7900 ซึ่งดูเหมือนพิมพ์ผิด
//   2. ตอนหักเงินต้องแกะข้อความกลับเป็นตัวเลขด้วย regex ทุกครั้ง
//      ถ้าวันหลังมีคนใส่รูปแบบใหม่ที่ regex ไม่รองรับ ราคาจะเพี้ยนเงียบ ๆ
// ตอนนี้เก็บตัวเลขไว้อย่างเดียว แล้วค่อยจัดรูปแบบตอนแสดงผลที่เดียว
const products = [
  { id: 1, name: "Violet", price: 9900, image: "/image/rov/violet.jpg" },
  { id: 2, name: "Airi", price: 1000, image: "/image/rov/airi.jpg" },
  { id: 3, name: "Lauriel", price: 5300, image: "/image/rov/lauriel.jpg" },
  { id: 4, name: "Yorn", price: 3400, image: "/image/rov/yorn.jpg" },
  { id: 5, name: "Veres", price: 1500, image: "/image/rov/veres.jpg" },
  { id: 6, name: "Toro", price: 1600, image: "/image/rov/toro.jpg" },
  { id: 7, name: "Tel'Annas", price: 700, image: "/image/rov/telannas.jpg" },
  { id: 8, name: "Paine", price: 1888, image: "/image/rov/paine.jpg" },
  { id: 9, name: "Bright", price: 1909, image: "/image/rov/bright.jpg" },
  { id: 11, name: "Ryoma", price: 2100, image: "/image/rov/ryoma.jpg" },
  { id: 14, name: "Kahlii", price: 2400, image: "/image/rov/kahlii.jpg" },
  { id: 15, name: "Airi", price: 7900, image: "/image/rov/airi-classic.jpg" },
  { id: 16, name: "Liliana", price: 2000, image: "/image/rov/liliana.jpg" },
];

// จัดรูปแบบราคาไว้ที่เดียว ทุกที่ที่แสดงราคาจึงหน้าตาเหมือนกันเสมอ
function formatPrice(amount) {
  return `฿${amount.toLocaleString("th-TH")}`;
}

function ROVShop() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  // เก็บ id ของสินค้าที่รูปโหลดไม่ขึ้น เพื่อสลับไปแสดงกล่องแทนที่
  const [brokenImages, setBrokenImages] = useState({});
  // ใช้ยอดเงินกลางร่วมกับทั้งเว็บ แทนการถือ Coins ของตัวเองแยกต่างหาก
  const { balance, decreaseBalance } = useContext(BalanceContext);

  // การซ่อนและแสดงเมนูจัดการด้วยคลาส open ใน CSS แล้ว
  // ไม่ต้องไปสั่ง display ทับผ่าน ref อีก

  // เปิด Popup ยืนยันการซื้อ
  function confirmPurchase(product) {
    setSelectedProduct(product);
  }

  // ปิด Popup
  function closePopup() {
    setSelectedProduct(null);
  }

  // ปิดป๊อปอัพและเมนูสไลด์ด้วยปุ่ม Esc
  //
  // เป็นสิ่งที่ผู้ใช้คาดหวังจากทุกกล่องที่เด้งคลุมหน้าจอ และจำเป็นจริง ๆ
  // สำหรับคนที่ใช้คีย์บอร์ดอย่างเดียว เพราะเดิมทางปิดมีแค่กดปุ่มด้วยเมาส์
  useEffect(() => {
    function onKeyDown(event) {
      if (event.key !== "Escape") return;
      setSelectedProduct(null);
      setMenuOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    // ต้องถอดตัวรับออกตอนคอมโพเนนต์ถูกถอด ไม่งั้นมันค้างอยู่แล้วทำงานซ้อนกัน
    // ทุกครั้งที่ผู้ใช้เข้าออกหน้านี้
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // เมื่อกดยืนยันซื้อสินค้า
  function handleConfirm() {
    if (!selectedProduct) return;

    if (decreaseBalance(selectedProduct.price)) {
      setSelectedProduct(null);
      setTimeout(() => {
        alert(`คุณได้ซื้อ ${selectedProduct.name} เรียบร้อยแล้ว!`);
      }, 100);
    } else {
      alert(
        `Coins ไม่เพียงพอ\nราคา ${selectedProduct.price} แต่คุณมีอยู่ ${balance}`
      );
    }
  }

  return (
    <div className={styles.shopContainer}>
      {/* แสดง Coins ที่มุมขวาบน */}
      <div className={styles.coinsDisplay}>
        💰 Coins: {balance.toLocaleString()}
      </div>

      {/* ปุ่ม ☰ ที่มุมซ้าย */}
      <div
        className={styles.menuIcon}
        aria-label="เปิดเมนู"
        aria-expanded={menuOpen}
        {...cardButtonProps(() => setMenuOpen((open) => !open))}
      >
        ☰
      </div>

      {/* เมนู Sidebar */}
      <div className={`${styles.sidebar} ${menuOpen ? styles.open : ""}`}>
        <button className={styles.closeButton} onClick={() => setMenuOpen(false)} aria-label="ปิดเมนู">✕</button>
        <Link to="/Home" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/ROVShop" onClick={() => setMenuOpen(false)}>Shop</Link>
        <Link to="/" onClick={() => setMenuOpen(false)}>Login</Link>
      </div>

      <h1>We've gathered together some of the coolest Skins for you.</h1>
      <h2>All Skins</h2>

      {/* ตารางสินค้า */}
      <div className={styles.productGrid}>
        {products.map((product) => (
          <div
            className={styles.productCard}
            key={product.id}
            {...cardButtonProps(() => confirmPurchase(product))}
          >
            {/* ถ้ารูปไหนโหลดไม่ขึ้นให้แสดงกล่องแทนพร้อมข้อความบอก
                ไม่ปล่อยให้เป็นช่องว่างเปล่าที่ดูเหมือนเว็บพัง
                ตอนนี้รูปอยู่ในโปรเจกต์แล้วจึงแทบไม่มีทางเกิด แต่เก็บไว้เป็นตาข่ายรอง
                เผื่อวันหลังมีคนลบไฟล์รูปออกไปโดยไม่ได้แก้รายการสินค้าตาม */}
            {brokenImages[product.id] ? (
              <div className={styles.imageFallback}>ไม่มีรูปตัวอย่าง</div>
            ) : (
              <img
                src={product.image}
                alt={product.name}
                onError={() =>
                  setBrokenImages((prev) => ({ ...prev, [product.id]: true }))
                }
              />
            )}
            <h3 className={styles.productName}>{product.name}</h3>
            <p className={styles.productPrice}>{formatPrice(product.price)}</p>
          </div>
        ))}
      </div>

      {/* Popup ยืนยันการซื้อ */}
      {selectedProduct && (
        <div className={styles.popupOverlay} onClick={closePopup}>
          {/* กันไม่ให้การกดในกล่องทะลุไปโดนพื้นหลังแล้วปิดป๊อปอัพไปด้วย */}
          <div className={styles.popupBox} onClick={(e) => e.stopPropagation()}>
            <h2>ยืนยันการซื้อ</h2>
            <p>คุณต้องการซื้อ <strong>{selectedProduct.name}</strong> ในราคา {formatPrice(selectedProduct.price)} หรือไม่?</p>
            <div className={styles.popupButtons}>
              <button className={styles.confirmButton} onClick={handleConfirm}>✅ ยืนยัน</button>
              <button className={styles.cancelButton} onClick={closePopup}>❌ ยกเลิก</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ROVShop;

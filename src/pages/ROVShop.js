import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { BalanceContext } from "../BalanceContext"; // ยอดเงินกลางของทั้งเว็บ
import style from "./ROVShop.module.css"; // ใช้ CSS Modules

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

  // เมื่อกดยืนยันซื้อสินค้า
  function handleConfirm() {
    if (selectedProduct) {
      // ตัดสัญลักษณ์เงินและลูกน้ำทุกตัวออกก่อนแปลงเป็นตัวเลข
      const price = parseInt(selectedProduct.price.replace(/[฿,]/g, ""), 10);

      if (decreaseBalance(price)) {
        setSelectedProduct(null);
        setTimeout(() => {
          alert(`คุณได้ซื้อ ${selectedProduct.name} เรียบร้อยแล้ว!`);
        }, 100);
      } else {
        alert(`Coins ไม่เพียงพอ\nราคา ${price} แต่คุณมีอยู่ ${balance}`);
      }
    }
  }

  return (
    <div className={style['shop-container']}>
      {/* แสดง Coins ที่มุมขวาบน */}
      <div className={style['coins-display']}>
        💰 Coins: {balance.toLocaleString()}
      </div>

      {/* ปุ่ม ☰ ที่มุมซ้าย */}
      <div className={style['menuicon']} onClick={() => setMenuOpen(!menuOpen)}>☰</div>

      {/* เมนู Sidebar */}
      <div className={`${style.sidebar} ${menuOpen ? style.open : ""}`}>
        <button className={style['close-btn']} onClick={() => setMenuOpen(false)}>✖</button>
        <Link to="/Home" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/ROVShop" onClick={() => setMenuOpen(false)}>Shop</Link>
        <Link to="/" onClick={() => setMenuOpen(false)}>Login</Link>
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
            {/* รูปสกินทุกใบดึงมาจากเว็บภายนอก ซึ่งเจ้าของเว็บนั้นย้ายหรือลบรูปได้
                ตลอดเวลาโดยเราไม่รู้ตัว ถ้ารูปไหนโหลดไม่ขึ้นให้แสดงกล่องแทน
                พร้อมข้อความบอก ไม่ปล่อยให้เป็นช่องว่างเปล่าที่ดูเหมือนเว็บพัง */}
            {brokenImages[product.id] ? (
              <div className={style['image-fallback']}>ไม่มีรูปตัวอย่าง</div>
            ) : (
              <img
                src={product.image}
                alt={product.name}
                onError={() =>
                  setBrokenImages((prev) => ({ ...prev, [product.id]: true }))
                }
              />
            )}
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
//
// รูปทุกใบเก็บไว้ในโปรเจกต์เองที่ public/image/rov/ ไม่ได้ดึงจากเว็บคนอื่นแล้ว
//
// เดิมทั้ง 16 ใบเป็นลิงก์ตรงไปยังเซิร์ฟเวอร์ของเว็บข่าวเกมเจ็ดเจ้า
// ซึ่งเป็นของคนอื่นทั้งหมด เขาย้ายหรือลบเมื่อไรรูปเราก็หายทันทีโดยไม่รู้ตัว
// และมันเกิดขึ้นแล้วจริงกับสามใบที่เซิร์ฟเวอร์ปลายทางตอบ 504 มาตลอด
const products = [
  { id: 1, name: "Violet", price: "฿9,900", image: "/image/rov/violet.jpg" },
  { id: 3, name: "Lauriel", price: "฿5,300", image: "/image/rov/lauriel.jpg" },
  { id: 4, name: "Yorn", price: "฿3,400", image: "/image/rov/yorn.jpg" },
  { id: 5, name: "Veres", price: "฿1,500", image: "/image/rov/veres.jpg" },
  { id: 6, name: "Toro", price: "฿1,600", image: "/image/rov/toro.jpg" },
  { id: 7, name: "Tel'Annas", price: "฿700", image: "/image/rov/telannas.jpg" },
  { id: 8, name: "Paine", price: "฿1,888", image: "/image/rov/paine.jpg" },
  { id: 9, name: "Bright", price: "฿1,909", image: "/image/rov/bright.jpg" },
  { id: 11, name: "Ryoma", price: "฿2,100", image: "/image/rov/ryoma.jpg" },
  { id: 14, name: "Kahlii", price: "฿2,400", image: "/image/rov/kahlii.jpg" },
  { id: 15, name: "Airi", price: "฿7900", image: "/image/rov/airi-classic.jpg" },
  { id: 16, name: "Liliana", price: "฿2000", image: "/image/rov/liliana.jpg" },
  { id: 2, name: "Airi", price: "฿1,000", image: "/image/rov/airi.jpg" },
];

export default ROVShop;

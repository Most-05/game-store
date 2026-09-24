import React, { useState, useContext, useEffect, useRef } from "react";
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
//
// สกินของ Airi มีสองใบ เดิมทั้งคู่ชื่อ "Airi" เหมือนกันเป๊ะ ต่างกันแค่ราคา
// ผู้ใช้จึงแยกไม่ออกว่าใบไหนคือใบไหน เติมชื่อชุดต่อท้ายตามรูปจริงของแต่ละใบ
const products = [
  { id: 1, name: "Violet", price: 9900, image: "/image/rov/violet.jpg" },
  { id: 2, name: "Airi ชุดนักเรียน", price: 1000, image: "/image/rov/airi.jpg" },
  { id: 3, name: "Lauriel", price: 5300, image: "/image/rov/lauriel.jpg" },
  { id: 4, name: "Yorn", price: 3400, image: "/image/rov/yorn.jpg" },
  { id: 5, name: "Veres", price: 1500, image: "/image/rov/veres.jpg" },
  { id: 6, name: "Toro", price: 1600, image: "/image/rov/toro.jpg" },
  { id: 7, name: "Tel'Annas", price: 700, image: "/image/rov/telannas.jpg" },
  { id: 8, name: "Paine", price: 1888, image: "/image/rov/paine.jpg" },
  { id: 9, name: "Bright", price: 1909, image: "/image/rov/bright.jpg" },
  { id: 10, name: "Ilumia", price: 2300, image: "/image/rov/ilumia.jpg" },
  { id: 11, name: "Ryoma", price: 2100, image: "/image/rov/ryoma.jpg" },
  { id: 12, name: "Nakroth", price: 4000, image: "/image/rov/nakroth.jpg" },
  { id: 13, name: "Yena", price: 2500, image: "/image/rov/yena.jpg" },
  { id: 14, name: "Kahlii", price: 2400, image: "/image/rov/kahlii.jpg" },
  { id: 15, name: "Airi กิโมโนซากุระ", price: 7900, image: "/image/rov/airi-classic.jpg" },
  { id: 16, name: "Liliana", price: 2000, image: "/image/rov/liliana.jpg" },
];

// จัดรูปแบบตัวเลขไว้ที่เดียว ทุกที่ที่แสดงราคาหรือยอดเงินจึงหน้าตาเหมือนกันเสมอ
function formatCoins(amount) {
  return amount.toLocaleString("th-TH");
}

function formatPrice(amount) {
  return `฿${formatCoins(amount)}`;
}

function ROVShop() {
  const [menuOpen, setMenuOpen] = useState(false);
  // สินค้าที่กำลังถามยืนยัน ถ้าเป็น null แปลว่ายังไม่ได้กดอะไร
  const [selectedProduct, setSelectedProduct] = useState(null);
  // ผลของการกดยืนยันไปแล้ว { product, ok } ใช้แสดงในกล่องเดิมแทน alert
  const [purchaseResult, setPurchaseResult] = useState(null);
  // เก็บ id ของสินค้าที่รูปโหลดไม่ขึ้น เพื่อสลับไปแสดงกล่องแทนที่
  const [brokenImages, setBrokenImages] = useState({});
  // ใช้ยอดเงินกลางร่วมกับทั้งเว็บ แทนการถือ Coins ของตัวเองแยกต่างหาก
  const { balance, decreaseBalance } = useContext(BalanceContext);

  // จำว่าก่อนเปิดกล่องผู้ใช้โฟกัสอยู่ที่อะไร จะได้คืนโฟกัสกลับที่เดิมตอนปิด
  const lastFocusedRef = useRef(null);
  const dialogRef = useRef(null);
  const primaryButtonRef = useRef(null);

  const dialogOpen = Boolean(selectedProduct || purchaseResult);

  // ย้ายโฟกัสเข้าไปในกล่องทันทีที่เปิด และทุกครั้งที่เนื้อในกล่องเปลี่ยน
  //
  // เดิมกดเปิดกล่องแล้วโฟกัสยังค้างอยู่ที่การ์ดสินค้าข้างหลัง คนที่ใช้คีย์บอร์ด
  // กด Tab ต่อจึงไล่ไปการ์ดใบอื่นที่อยู่หลังฉากคลุม แทนที่จะวนอยู่ในปุ่มของกล่อง
  // และโปรแกรมอ่านหน้าจอก็ไม่ประกาศว่ามีกล่องเด้งขึ้นมา
  useEffect(() => {
    if (dialogOpen) primaryButtonRef.current?.focus();
  }, [dialogOpen, purchaseResult]);

  function openConfirm(product) {
    lastFocusedRef.current = document.activeElement;
    setSelectedProduct(product);
  }

  // ปิดกล่องทุกแบบ แล้วคืนโฟกัสกลับไปที่การ์ดที่ผู้ใช้กดมา
  function closeDialog() {
    setSelectedProduct(null);
    setPurchaseResult(null);
    lastFocusedRef.current?.focus();
  }

  // ปิดกล่องและเมนูสไลด์ด้วยปุ่ม Esc
  //
  // เป็นสิ่งที่ผู้ใช้คาดหวังจากทุกกล่องที่เด้งคลุมหน้าจอ และจำเป็นจริง ๆ
  // สำหรับคนที่ใช้คีย์บอร์ดอย่างเดียว เพราะเดิมทางปิดมีแค่กดปุ่มด้วยเมาส์
  useEffect(() => {
    function onKeyDown(event) {
      if (event.key !== "Escape") return;
      setSelectedProduct(null);
      setPurchaseResult(null);
      setMenuOpen(false);
      lastFocusedRef.current?.focus();
    }
    window.addEventListener("keydown", onKeyDown);
    // ต้องถอดตัวรับออกตอนคอมโพเนนต์ถูกถอด ไม่งั้นมันค้างอยู่แล้วทำงานซ้อนกัน
    // ทุกครั้งที่ผู้ใช้เข้าออกหน้านี้
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // ขังปุ่ม Tab ไว้ในกล่อง ไม่ให้หลุดออกไปโดนของที่อยู่หลังฉากคลุม
  function trapTab(event) {
    if (event.key !== "Tab") return;

    const focusables = dialogRef.current?.querySelectorAll("button, a[href]");
    if (!focusables || focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  // เมื่อกดยืนยันซื้อสินค้า
  //
  // เดิมแจ้งผลด้วย alert ของเบราว์เซอร์ ซึ่งหน้าตาดิบและขัดกับกล่องยืนยัน
  // ที่เพิ่งกดไปเมื่อครู่ ซ้ำยังต้องใช้ setTimeout หน่วง 100 มิลลิวินาที
  // เพื่อหลบจังหวะ render ซึ่งเป็นการแก้แบบเดา ตอนนี้แสดงผลในกล่องเดิมแทน
  function handleConfirm() {
    if (!selectedProduct) return;

    const ok = decreaseBalance(selectedProduct.price);
    setPurchaseResult({ product: selectedProduct, ok });
    setSelectedProduct(null);
  }

  return (
    <div className={styles.shopContainer}>
      {/* แสดง Coins ที่มุมขวาบน */}
      <div className={styles.coinsDisplay}>
        💰 Coins: {formatCoins(balance)}
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

      <h1>คัดสกินเด็ด ๆ มารวมไว้ให้คุณแล้ว</h1>
      <h2>สกินทั้งหมด</h2>

      {/* ตารางสินค้า */}
      <div className={styles.productGrid}>
        {products.map((product) => (
          <div
            className={styles.productCard}
            key={product.id}
            {...cardButtonProps(() => openConfirm(product))}
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

      {/* กล่องยืนยันการซื้อกับกล่องแจ้งผล ใช้โครงเดียวกัน สลับแค่เนื้อใน */}
      {dialogOpen && (
        <div className={styles.popupOverlay} onClick={closeDialog}>
          {/* stopPropagation กันไม่ให้การกดในกล่องทะลุไปโดนฉากคลุมแล้วปิดกล่องไปด้วย */}
          <div
            className={styles.popupBox}
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="rov-dialog-title"
            onClick={(event) => event.stopPropagation()}
            onKeyDown={trapTab}
          >
            {selectedProduct && (
              <>
                <h2 id="rov-dialog-title">ยืนยันการซื้อ</h2>
                <p>
                  คุณต้องการซื้อ <strong>{selectedProduct.name}</strong> ในราคา{" "}
                  {formatPrice(selectedProduct.price)} หรือไม่?
                </p>
                <div className={styles.popupButtons}>
                  <button className={styles.confirmButton} onClick={handleConfirm} ref={primaryButtonRef}>
                    ✅ ยืนยัน
                  </button>
                  <button className={styles.cancelButton} onClick={closeDialog}>
                    ❌ ยกเลิก
                  </button>
                </div>
              </>
            )}

            {purchaseResult && purchaseResult.ok && (
              <>
                <h2 id="rov-dialog-title">✅ ซื้อสำเร็จ</h2>
                <p>
                  คุณได้ซื้อ <strong>{purchaseResult.product.name}</strong> เรียบร้อยแล้ว
                </p>
                <p>เหลือ {formatCoins(balance)} Coins</p>
                <div className={styles.popupButtons}>
                  <button className={styles.confirmButton} onClick={closeDialog} ref={primaryButtonRef}>
                    เลือกสกินต่อ
                  </button>
                </div>
              </>
            )}

            {purchaseResult && !purchaseResult.ok && (
              <>
                <h2 id="rov-dialog-title">Coins ไม่เพียงพอ</h2>
                <p>
                  <strong>{purchaseResult.product.name}</strong> ราคา{" "}
                  {formatPrice(purchaseResult.product.price)} แต่คุณมีอยู่{" "}
                  {formatCoins(balance)} Coins
                </p>
                <div className={styles.popupButtons}>
                  {/* เดิมบอกแค่ว่าเงินไม่พอแล้วจบ ผู้ใช้ต้องหาทางไปเติมเงินเอง */}
                  <Link to="/add-funds" className={styles.confirmButton} ref={primaryButtonRef}>
                    ไปเติมเงิน
                  </Link>
                  <button className={styles.cancelButton} onClick={closeDialog}>
                    ปิด
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ROVShop;

import React, { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BalanceContext } from '../BalanceContext'; // ยอดเงินกลางของทั้งเว็บ
import styles from './ARKHome.module.css'; // นำเข้า CSS Module

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { itemName, price, image } = location.state || {};
  const [isPurchased, setIsPurchased] = useState(false);
  const { balance, decreaseBalance } = useContext(BalanceContext);

  if (!itemName || !price) {
    return <div>Loading...</div>;
  }

  const handleConfirm = () => {
    // หักเงินก่อนเสมอ ถ้ายอดไม่พอจะได้ไม่แจ้งว่าซื้อสำเร็จ
    if (!decreaseBalance(price)) {
      alert(
        `ยอดเงินไม่เพียงพอ\nราคา ${price} coin แต่คุณมีอยู่ ${balance} coin\nกรุณาไปเติมเงินก่อน`
      );
      return;
    }

    setIsPurchased(true); // เปิด Modal
    setTimeout(() => {
      alert(`คุณได้ซื้อ ${itemName} เรียบร้อยแล้ว! ราคา ${price} coin`);
      // กลับไปหน้าหมวดที่ผู้ใช้กดซื้อมา ไม่ใช่ยัดกลับไป dino-pack เสมอ
      navigate(-1);
    }, 100);

    setTimeout(() => {
      setIsPurchased(false);
    }, 2000);
  };

  return (
    <div className={styles.checkout}>
      <h1>Checkout</h1>
      <div className={styles.dinoDetails}>
        {/* ที่อยู่ของรูปส่งมากับ state ตอนกดซื้อ

            เดิมบรรทัดนี้เดาชื่อไฟล์เอาเองจากชื่อสินค้า ด้วยการแปลงเป็นตัวพิมพ์เล็ก
            แล้วตัดช่องว่างออก เช่น "Flak Chestpiece" กลายเป็น flakchestpiece.jpg
            แต่ไฟล์จริงชื่อ FlakChestpiece.jpg

            บนวินโดวส์ใช้ได้เพราะระบบไฟล์ไม่สนตัวพิมพ์ใหญ่เล็ก แต่เซิร์ฟเวอร์
            Linux ทุกตัวสน ซึ่งรวมถึง GitHub Pages, Netlify และ Vercel
            พอเอาขึ้นโฮสต์จริงรูปจะพัง 19 จาก 26 รายการ โดยตอนพัฒนาในเครื่อง
            ไม่มีวันเห็นอาการเลย

            หน้าหมวดรู้ที่อยู่รูปที่ถูกต้องอยู่แล้วเพราะมันแสดงรูปนั้นอยู่
            ส่งต่อมาเลยจึงตรงเสมอ ไม่ต้องเดา */}
        {image ? <img src={image} alt={itemName} /> : null}
        <h3>{itemName}</h3>
        <p>Price: {price} Coins</p>
        <p>ยอดเงินของคุณ: {balance} Coins</p>
      </div>

      <div className={styles.buttonGroup}>
        <button onClick={() => navigate(-1)} className={styles.backBtn}>
          BACK
        </button>
        <button onClick={handleConfirm} className={styles.purchaseBtn}>
          BUY NOW
        </button>
      </div>

      {/* Popup Modal */}
      {isPurchased && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.checkmark}>✔</div>
            <h2>ซื้อสำเร็จ!</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;

import React, { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BalanceContext } from '../BalanceContext'; // ยอดเงินกลางของทั้งเว็บ
import styles from './ARKHome.module.css'; // นำเข้า CSS Module

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { itemName, price } = location.state || {};
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
        <img
          src={`/image/${itemName.toLowerCase().replace(/\s+/g, "")}.jpg`}
          alt={itemName}
         
        />
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

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './ARKHome.module.css'; // นำเข้า CSS Module

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { itemName, price } = location.state || {};
  const [isPurchased, setIsPurchased] = useState(false);

  if (!itemName || !price) {
    return <div>Loading...</div>;
  }

  const handleConfirm = () => {
    setIsPurchased(true); // เปิด Modal
    setTimeout(() => {
      alert(`คุณได้ซื้อ ${itemName} เรียบร้อยแล้ว! ราคา ${price} coin`);
      navigate('/dino-pack', { state: { itemName, price } });
    }, 100);

    setTimeout(() => {
      setIsPurchased(false);
    }, 2000);
  };

  return (
    <div className='checkout1'>
    <div className={styles.checkout}>
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <div className={styles.dinoDetails}>
        <img
          src={`/image/${itemName.toLowerCase().replace(" ", "")}.jpg`}
          alt={itemName}
          className="w-full h-40 object-cover rounded-md mb-4"
        />
        <h3 className="text-2xl font-semibold">{itemName}</h3>
        <p className="text-lg">Price: {price} Coins</p>
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
    </div>
  );
};

export default CheckoutPage;

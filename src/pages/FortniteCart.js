import React, { useContext, useState } from 'react';
import { useCart } from 'react-use-cart';
import { Modal } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { BalanceContext } from '../BalanceContext'; // ยอดเงินกลางของทั้งเว็บ
import styles from './FortniteShop.module.css';

const Cart = () => {
    const { isEmpty, totalUniqueItems, items, cartTotal, removeItem, emptyCart } = useCart();
    const [showModal, setShowModal] = useState(false);
    const CheckOut = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    // ใช้ยอดเงินกลางร่วมกับทั้งเว็บ แทนเลข 500 ที่เคยฝังไว้ตายตัว
    const { balance, decreaseBalance } = useContext(BalanceContext);
    const showAlert = () => {
        if (decreaseBalance(cartTotal)) {
            alert("คุณสั่งซื้อสำเร็จแล้ว \nเงินคงเหลือ " + (balance - cartTotal) + " บาท");
            emptyCart();   // ซื้อแล้วต้องล้างตะกร้า ไม่งั้นกดสั่งซื้อซ้ำได้ไม่จำกัด
            handleClose();
        } else {
            alert(
                "จำนวนเงินไม่เพียงพอ กรุณาไปเติมเงิน\nราคารวม " +
                cartTotal + " บาท แต่คุณมีอยู่ " + balance + " บาท"
            );
        }
    };

    // ตะกร้าว่าง เดิมขึ้นแค่หัวเรื่องบรรทัดเดียวกลางหน้าขาว ไม่มีทางไปต่อ
    // ผู้ใช้ต้องกดปุ่มย้อนกลับของเบราว์เซอร์เอง
    if (isEmpty) {
        return (
            <div className={styles.page}>
                <div className={styles.empty}>
                    <span className={styles.emptyIcon} aria-hidden="true">🛒</span>
                    <h1 className={styles.emptyTitle}>ตะกร้าของคุณยังว่าง</h1>
                    <p className={styles.emptyText}>ยังไม่ได้เลือกไอเทมไหนเลย ลองกลับไปดูของในร้านก่อน</p>
                    <Link to="/FortniteHome" className={styles.cartLink}>← กลับไปเลือกของ</Link>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <div className={styles.cartPage}>
                <div className={styles.topbar}>
                    <Link to="/FortniteHome" className={styles.backLink}>← กลับไปเลือกของ</Link>
                    <span className={styles.balance}>
                        จำนวนเงิน : <span className={styles.balanceValue}>{balance}</span> บาท
                    </span>
                </div>

                <div className={styles.cartHead}>
                    <h1 className={styles.cartTitle}>ตะกร้า ({totalUniqueItems})</h1>
                    <p className={styles.cartTotal}>ราคารวม: {cartTotal} บาท</p>
                </div>

                {/* เดิมเป็นตารางสี่คอลัมน์ที่ยืดเต็มความกว้างจอ ราคากับปุ่มลบจึงอยู่
                    ห่างจากชื่อสินค้าเป็นคืบ ตาต้องกวาดข้ามที่ว่างไปหาว่าแถวไหนคู่กับอะไร
                    เปลี่ยนเป็นรายการแบบแถวการ์ด ของที่เกี่ยวกันอยู่ใกล้กัน และย่อลงจอมือถือได้ */}
                <ul className={styles.cartList}>
                    {items.map((item, index) => (
                        <li className={styles.cartRow} key={index}>
                            <img className={styles.cartThumb} src={item.img} alt={item.title} />
                            <div className={styles.cartInfo}>
                                <p className={styles.cartItemName}>{item.title}</p>
                                <p className={styles.cartItemPrice}>{item.price} บาท</p>
                            </div>
                            <button type="button" className={styles.dangerButton} onClick={() => removeItem(item.id)}>
                                ลบ Item
                            </button>
                        </li>
                    ))}
                </ul>

                <div className={styles.cartActions}>
                    <button type="button" className={styles.primaryButton} onClick={CheckOut}>
                        Check Out
                    </button>
                    <button type="button" className={styles.ghostButton} onClick={emptyCart}>
                        ล้างตะกร้า
                    </button>
                </div>

                {/* ป๊อปอัพยืนยันก่อนสั่งซื้อ

                    react-bootstrap วาง Modal ไว้นอกต้นไม้ของหน้านี้ คลาสจาก CSS Module
                    จึงต้องส่งผ่าน contentClassName ให้โดยตรง ไม่งั้นได้กล่องขาวตามค่าเริ่มต้น */}
                <Modal show={showModal} onHide={handleClose} size="lg" contentClassName={styles.modal}>
                    <Modal.Header closeButton className={styles.modalHeader}>
                        <Modal.Title className={styles.modalTitle}>Check Out</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ul className={styles.cartList}>
                            {items.map((item, index) => (
                                <li className={styles.cartRow} key={index}>
                                    <img className={styles.cartThumb} src={item.img} alt={item.title} />
                                    <div className={styles.cartInfo}>
                                        <p className={styles.cartItemName}>{item.title}</p>
                                        <p className={styles.cartItemPrice}>{item.price} บาท</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Modal.Body>
                    <Modal.Footer className={styles.modalFooter}>
                        <div>
                            <p className={styles.summaryTotal}>ราคารวม: {cartTotal} บาท</p>
                            <p className={styles.summaryBalance}>เงินคงเหลือ: {balance} บาท</p>
                        </div>
                        <div className={styles.cartActions}>
                            <button type="button" className={styles.ghostButton} onClick={handleClose}> ปิด </button>
                            <button type="button" className={styles.primaryButton} onClick={showAlert}> สั่งซื้อ </button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default Cart;

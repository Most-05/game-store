import React, { useContext, useState } from "react";
import Itemcard from "./FortniteItemcard";
import data from "./Fortnitedata";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import fortnite from './Fortnitephoto/FortniteLogo.png'
import { useCart } from 'react-use-cart';
import { BalanceContext } from '../BalanceContext';
import styles from './FortniteShop.module.css';

const FortniteHome = () => {
    const [showModal, setShowModal] = useState(false);
    // ยอดเงินกลางของทั้งเว็บ หน้านี้เดิมมีป้าย "จำนวนเงิน :" ที่ไม่เคยมีตัวเลขตามหลัง
    const { balance } = useContext(BalanceContext);
    // จำนวนของในตะกร้า ใช้โชว์บนปุ่มไปตะกร้า จะได้รู้ว่ากดเพิ่มไปแล้วกี่ชิ้น
    const { totalUniqueItems } = useCart();
    const name = ["Emmy_Gift-01","Emmy_Gift-02","Emmy_Gift-03","Emmy_Gift-04"
        ,"Emmy_Gift-05","Emmy_Gift-06","Emmy_Gift-07","Emmy_Gift-08","Emmy_Gift-09"]
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    return (
        <div className={styles.page}>
            <div className={styles.topbar}>
                <Link to="/Home" className={styles.backLink}>← หน้าหลัก</Link>
                <span className={styles.balance}>
                    จำนวนเงิน : <span className={styles.balanceValue}>{balance}</span> บาท
                </span>
            </div>

            <header className={styles.hero}>
                {/* โลโก้เป็น PNG ตัวอักษรสีดำบนพื้นโปร่ง เดิมวางบนพื้นขาวจึงอ่านออก
                    พอเปลี่ยนเป็นธีมมืดต้องกลับสีให้เป็นตัวอักษรขาว ไม่งั้นหายไปทั้งอัน
                    การกลับสีทำในไฟล์สไตล์ ที่นี่แค่ผูกคลาสให้ */}
                <img src={fortnite} alt="Fortnite" className={styles.logo} />
                <h1 className={styles.shopName}>ร้าน Emmy Gift Shop</h1>
                <p className={styles.tagline}>Item Shop วันนี้</p>
            </header>

            <hr className={styles.divider} />

            <div className={styles.toolbar}>
                <button type="button" className={styles.ghostButton} onClick={handleShow}>
                    รายละเอียดในการสั่งซื้อ
                </button>
                <Link to="/Cart" className={styles.cartLink}>
                    ตะกร้า <span className={styles.cartCount}>{totalUniqueItems}</span>
                </Link>
            </div>

            <Modal show={showModal} onHide={handleClose} size="lg" contentClassName={styles.modal}>
                <Modal.Header closeButton className={styles.modalHeader}>
                    <Modal.Title className={styles.modalTitle}>รายละเอียดในการสั่งซื้อ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className={styles.modalLead}>ต้องแอดเพื่อนในเกม ดังชื่อในเกมต่อไปนี้</p>
                    <ul className={styles.nameList}>
                        {name.map((n, index) => (
                            <li key={index} className={styles.nameChip}>{n}</li>
                        ))}
                    </ul>
                    <p className={styles.modalNote}>โดยที่คนที่เพิ่งแอดเพื่อน จะต้องแจ้งชื่อในเกมให้แอดมินทราบ</p>
                    <p className={styles.modalNote}>หลังจากที่แอดมินแอดเพื่อนแล้ว จะต้องรอ 2 วัน(หลังจากได้ทำการแอดเพื่อน) จะสามารถสั่งซื้อ Gift ได้</p>
                </Modal.Body>
            </Modal>

            <div className={styles.grid}>
                {data.productData.map((item, index) => (
                    <Itemcard
                        img={item.img}
                        title={item.title}
                        desc={item.desc}
                        pricefn={item.pricefn}
                        price={item.price}
                        item={item}
                        key={index}
                    />
                ))}
            </div>
        </div>
    );
};

export default FortniteHome;

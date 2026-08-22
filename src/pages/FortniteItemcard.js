import { useState, useEffect } from "react";
import React from 'react';
import { useCart } from "react-use-cart";
import styles from './FortniteShop.module.css';

const Itemcard = (props) => {
    const { addItem, items } = useCart();
    const [isInCart, setIsInCart] = useState(false);

    useEffect(() => {
        const alreadyInCart = items.find(item => item.id === props.item.id);
        if (alreadyInCart) {
            setIsInCart(true);
        }
        else {
            setIsInCart(false);
        }
    }, [items, props.item.id]);

    const handleAddToCart = () => {
        if (!isInCart) {
            addItem(props.item);
            setIsInCart(true);
        }
    }

    return (
        <div className={styles.card}>
            {/* ครอบรูปด้วยกรอบที่บังคับสัดส่วนไว้ รูปสกินกับรูปไอเทมมาคนละสัดส่วน
                ถ้าปล่อยตามขนาดจริง ชื่อกับราคาของการ์ดในแถวเดียวกันจะอยู่คนละระดับ */}
            <div className={styles.thumb}>
                <img src={props.img} alt={props.title} />
            </div>
            <div className={styles.cardBody}>
                <h3 className={styles.cardTitle} data-testid="fortnite-item-title">{props.title}</h3>
                {/* แยกราคาเป็นสองบรรทัด เงินบาทเป็นตัวเด่นเพราะเป็นยอดที่จ่ายจริง
                    ส่วน V-Bucks เป็นข้อมูลอ้างอิงของเกม เดิมเขียนติดกันขนาดเท่ากัน
                    อ่านผ่าน ๆ แล้วแยกไม่ออกว่าต้องจ่ายเท่าไร */}
                <p className={styles.price}>{props.price} บาท</p>
                <p className={styles.priceSub}>{props.pricefn} V-Bucks</p>
                {props.desc ? <p className={styles.desc}>{props.desc}</p> : null}
                <div className={styles.cardAction}>
                    {isInCart ? (
                        <button className={styles.primaryButton} disabled> อยู่ในตะกร้าแล้ว </button>
                    ) : (
                        <button className={styles.primaryButton} onClick={handleAddToCart}> เพิ่มลงตะกร้า </button>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Itemcard;

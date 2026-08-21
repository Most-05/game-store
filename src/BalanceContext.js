import React, { createContext, useState, useEffect } from 'react';

export const BalanceContext = createContext();

export const BalanceProvider = ({ children }) => {
    // ดึงข้อมูลยอดเงินจาก localStorage ถ้ามีหรือเริ่มต้นที่ 0
    const storedBalance = localStorage.getItem('balance');
    const [balance, setBalance] = useState(storedBalance ? parseInt(storedBalance) : 0);

    // ฟังก์ชันสำหรับการอัปเดตยอดเงิน
    const updateBalance = (newBalance) => {
        setBalance(newBalance);
        localStorage.setItem('balance', newBalance); // บันทึกยอดเงินใน localStorage
    };

    // ฟังก์ชันสำหรับการลดยอดเงิน
    // คืนค่า true เมื่อหักเงินสำเร็จ และ false เมื่อยอดเงินไม่พอ
    // เดิมฟังก์ชันนี้เงียบไปเฉย ๆ เมื่อเงินไม่พอ ผู้เรียกจึงแยกไม่ออกว่าหักสำเร็จหรือไม่
    // แล้วไปแจ้งผู้ใช้ว่าซื้อสำเร็จทั้งที่เงินไม่ถูกหัก
    const decreaseBalance = (amount) => {
        if (!(amount > 0) || balance < amount) {
            return false;
        }
        const newBalance = balance - amount;
        setBalance(newBalance);
        localStorage.setItem('balance', newBalance); // อัปเดตใน localStorage
        return true;
    };

    // ใช้ useEffect เพื่อให้ยอดเงินที่ดึงมาเก็บไว้ใน localStorage ทุกครั้งที่มีการเปลี่ยนแปลง
    useEffect(() => {
        if (balance !== null) {
            localStorage.setItem('balance', balance);
        }
    }, [balance]);

    return (
        <BalanceContext.Provider value={{ balance, updateBalance, decreaseBalance }}>
            {children}
        </BalanceContext.Provider>
    );
};

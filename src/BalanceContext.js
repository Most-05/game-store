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
    const decreaseBalance = (amount) => {
        const newBalance = balance - amount;
        if (newBalance >= 0) {
            setBalance(newBalance);
            localStorage.setItem('balance', newBalance); // อัปเดตใน localStorage
        }
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

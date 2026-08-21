import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BalanceContext } from "../BalanceContext";
import "./AddFunds.css";

function AddFunds() {
  const { balance, updateBalance } = useContext(BalanceContext);
  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedBalance = localStorage.getItem("balance");
    if (savedBalance) {
      updateBalance(parseFloat(savedBalance));
    }
  }, [updateBalance]);

  // ฟังก์ชันในการเติมเงิน
  const handleAddFunds = () => {
    const amountValue = parseFloat(amount);
    const isValidPhone = /^[0-9]{10}$/.test(phoneNumber);

    if (isNaN(amountValue)) {
      alert("กรุณากรอกจำนวนเงินที่ถูกต้อง");
    } else if (!isValidPhone) {
      alert("กรุณากรอกหมายเลขโทรศัพท์ที่ถูกต้อง (10 หลัก)");
    } else {
      // อัปเดตยอดเงิน
      const newBalance = balance + amountValue;
      updateBalance(newBalance);
      localStorage.setItem("balance", newBalance);

      // แจ้งผลการเติมเงิน
      if (amountValue > 0) {
        alert(`เติมเงินสำเร็จ ${amountValue} บาท`);
      } else {
        alert(`หักเงินสำเร็จ ${Math.abs(amountValue)} บาท`);
      }

      navigate("/");
    }
  };

  // ฟังก์ชันในการจัดการกรอกจำนวนเงิน
  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (/^(-?\d*\.?\d*)$/.test(value)) {
      setAmount(value);
    }
  };

  return (
    <section id="add-funds">
      <h1>เติมเงิน</h1>
      <p>Current Balance: {balance} Coins</p> {/* แสดงยอดเงิน */}
      <input 
        type="number" 
        placeholder="Amount" 
        value={amount} 
        onChange={handleAmountChange} 
      />
      <input 
        type="text" 
        placeholder="Phone Number" 
        value={phoneNumber} 
        onChange={(e) => setPhoneNumber(e.target.value)} 
      />
      <button onClick={handleAddFunds}>เติมเงิน</button>
    </section>
  );
}

export default AddFunds;

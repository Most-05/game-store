import React, { useContext, useState } from 'react';
import { BalanceContext } from '../BalanceContext';
import { useLocation } from 'react-router-dom';  // ✅ เพิ่ม useLocation เพื่อตรวจสอบหน้า
import './header.css';

function Header() {
    const { balance } = useContext(BalanceContext);
    const [showBalance, setShowBalance] = useState(false);
    const [activeTab, setActiveTab] = useState("");
    
    const location = useLocation();  // ✅ ดึง pathname ของ URL ปัจจุบัน
    
    // ซ่อน Header ถ้าไม่ได้อยู่หน้า Home
    // เทียบแบบไม่สนตัวพิมพ์ เพราะ React Router แมตช์ route แบบไม่สนตัวพิมพ์อยู่แล้ว
    // login.js พาไป /home ตัวเล็ก แต่ route ประกาศเป็น /Home
    if (location.pathname.toLowerCase() !== "/home") {
        return null;
    }

    const handleCoinClick = (e) => {
        e.preventDefault();
        setShowBalance(!showBalance);
        setActiveTab('coin');
    };

    return (
        <header className="header">
            <div className="logo">
                <h1>Game Store</h1>
            </div>
            <nav>
                <a
                    href="#home"
                    onClick={() => {
                        window.location.hash = 'home';
                        setActiveTab('Home');
                    }}
                    className={activeTab === 'Home' ? 'active' : ''}
                >
                    Home
                </a>

                <a
                    href="#g1"
                    onClick={() => {
                        window.location.hash = 'g1';
                        setActiveTab('g1');
                    }}
                    className={activeTab === 'g1' ? 'active' : ''}
                >
                    Game
                </a>

                <a
                    href="#add-funds"
                    onClick={() => {
                        window.location.hash = 'add-funds';
                        setActiveTab('add-funds');
                    }}
                    className={activeTab === 'add-funds' ? 'active' : ''}
                >
                    เติมเงิน
                </a>

                <a
                    href="#coin"
                    onClick={handleCoinClick}
                    className={activeTab === 'coin' ? 'active' : ''}
                >
                    Coin
                </a>

                {showBalance && <span className="coin">Coin: ${balance}</span>}
            </nav>
        </header>
    );
}

export default Header;
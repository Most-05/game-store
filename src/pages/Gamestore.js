import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ใช้ useNavigate สำหรับการนำทาง
import './Gamestore.css';

function Game({ balance }) {
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [isNavigating, setIsNavigating] = useState(false); // เพิ่มสถานะการนำทาง
    const navigate = useNavigate(); // เรียกใช้งาน useNavigate

    const games = [
        {
            name: 'Fortnite',
            description: 'เกม Battle Royale ที่มีการสร้างสิ่งก่อสร้างและต่อสู้กันจนเหลือผู้ชนะคนสุดท้าย',
            imageUrl: 'https://www.yudiz.com/codepen/expandable-animated-card-slider/fortnite.jpg',
            link : '/FortniteHome',
        },
        {
            name: 'ARK: Survival Evolved',
            description: 'เกมเอาชีวิตรอดที่ผู้เล่นจะต้องสร้างที่หลบภัยและเชื่องไดโนเสาร์ในโลกที่เต็มไปด้วยอันตราย',
            imageUrl: 'https://cdn2.unrealengine.com/egs-arkultimatesurvivoredition-studiowildcard-bundles-s1-2560x1440-ab6e094c452b.jpg',
            link: '/ARKHome',
        },
        {
            name: 'ROV (Arena of Valor)',
            description: 'เกม MOBA ที่มีตัวละครหลากหลายและการแข่งขันที่ตื่นเต้น',
            imageUrl: 'https://s.isanook.com/ga/0/ud/212/1062009/image-rov-04.jpg?ip/crop/w1200h700/q80/webp',
            link : '/ROVHome'
        },
    ];

    const handleMouseEnter = (index) => {
        setExpandedIndex(index); // ขยายเกมเมื่อเอาเมาส์ไปชี้
    };

    const handleMouseLeave = () => {
        setExpandedIndex(null); // ย่อเกมเมื่อเมาส์ออก
    };

    const handleClick = (index) => {
        // หากเกมนี้มีลิงก์ให้หน่วงเวลาและทำการนำทาง
        if (games[index].link && !isNavigating) {
            setIsNavigating(true); // ตั้งสถานะการนำทางเป็น true
            setTimeout(() => {
                navigate(games[index].link); // นำทางหลังจากการขยาย
                setIsNavigating(false); // ตั้งสถานะการนำทางเป็น false หลังนำทาง
            }, 300); // รอให้การขยายเสร็จ
        }
    };

    return (
        <section className="game-section" id="g1">
            <h2 className="line-title">Trending Games</h2>
            <div className="game-list">
                {games.map((game, index) => (
                    <div
                        key={index}
                        className={`game-item ${expandedIndex === index ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${game.imageUrl})` }}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick(index)}
                    >
                        <div className={`game-desc ${expandedIndex === index ? 'show' : ''}`}>
                            <h3>{game.name}</h3>
                            <p>{game.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Game;

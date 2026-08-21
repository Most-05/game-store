import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import './home.css';
import Gamestore from './Gamestore.js';
import ARKHome from './ARKHome.js';
import AddFunds from './AddFunds.js';

function Home({ balance }) {
    const typedElement = useRef(null);

    useEffect(() => {
        const options = {
            strings: ["ยินดีต้อนรับสู่ Game Store"],
            typeSpeed: 90,
            backSpeed: 100,
            backDelay: 1000,
            loop: true,
            showCursor: false,
        };
        const typed = new Typed(typedElement.current, options);
        return () => {
            typed.destroy();
        };
    }, []);

    return (
        <>
            <section id="home" className="home">
                <div className="home-content">
                    <h1 ref={typedElement}></h1>
                    <h3>ค้นหาเกมที่คุณชื่นชอบและเติมเงิน Cion ของคุณ!</h3>
                    <h3>เติม Cion ในเกมวันนี้ รับ โบนัสเพิ่ม 20% หรือ ไอเทมพิเศษ เพียงทำการเติมเงินผ่านช่องทางที่กำหนด!</h3>
                </div>
            </section>

            <section>
                <Gamestore />
            </section>

            <section>
                <AddFunds />
            </section>

        </>
    );
}

export default Home;

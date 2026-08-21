import React, { useState } from "react";
import Itemcard from "./Itemcard";
import data from "./data";
import { Button, Modal } from "react-bootstrap"; 
import fortnite from './photo/FortniteLogo.png'

const Home = () => {
    const [showModal, setShowModal] = useState(false);
    const name = ["Emmy_Gift-01","Emmy_Gift-02","Emmy_Gift-03","Emmy_Gift-04"
        ,"Emmy_Gift-05","Emmy_Gift-06","Emmy_Gift-07","Emmy_Gift-08","Emmy_Gift-09"]
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    console.warn(data.productData);
    
    return (
        <section>
            <div>
            <a href="/" style={{fontSize: '1.5em',fontWeight:'bold', color: '#333', textDecoration: 'none', margin:'110px',paddingTop:'110px'}}> หนัาหลัก </a>
                <div style={{ textAlign: 'center' }}>
                    <img src={fortnite} alt="Fortnite Logo" style={{ display: 'block', margin: 'auto', width: '300px', height: 'auto', paddingTop: '15px' }} />
                    <h1 className="mt-3">ร้าน Emmy Gift Shop</h1>
                    <h2 className="mt-5">Item Shop วันนี้</h2>
                </div>
                <section className="py-4 container">
                <div className="d-flex justify-content-between" style={{ paddingBottom: '20px' }}>
                <Button variant="primary" onClick={handleShow}>
                    รายละเอียดในการสั่งซื้อ
                    </Button>
                        <Modal show={showModal} onHide={handleClose} size="lg">
                            <Modal.Header closeButton>
                                <Modal.Title>รายละเอียดในการสั่งซื้อ</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <h5>ต้องแอดเพื่อนในเกม ดังชื่อในเกมต่อไปนี้</h5>
                                <ul>
                                    {name.map((name, index) => (
                                    <li key={index} style={{paddingTop:'10px',paddingBottom:'10px'}}>{name}</li>
                                    ))}
                                </ul>
                                <h6>โดยที่คนที่เพิ่งแอดเพื่อน จะต้องแจ้งชื่อในเกมให้แอดมินทราบ</h6>
                                <h6>หลังจากที่แอดมินแอดเพื่อนแล้ว จะต้องรอ 2 วัน(หลังจากได้ทำการแอดเพื่อน) จะสามารถสั่งซื้อ Gift ได้</h6>
                            </Modal.Body>
                        </Modal>
                        <h5> จำนวนเงิน :  </h5>
                </div>
                    <div className="row justify-content-center">
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

                </section>
            </div> 
        </section>
    );
};

export default Home;

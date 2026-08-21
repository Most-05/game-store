import React, { useState } from 'react';
import { useCart } from 'react-use-cart';
import { Button, Modal } from "react-bootstrap";

const Cart = () => {
    const { isEmpty, totalUniqueItems, items, cartTotal, removeItem, emptyCart } = useCart();
    const [showModal, setShowModal] = useState(false);
    const CheckOut = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    const [money] = useState(500);
    const showAlert = () => {

        if(money-cartTotal >= 0){
            alert("คุณสั่งซื้อสำเร็จแล้ว \nเงินคงเหลือ " + (money-cartTotal) + " บาท");
        }
        else
        {
            alert("จำนวนเงินไม่เพียงพอ กรุณาไปเติมเงิน");
        }

    };

    if (isEmpty) return <h1 className='text-center'>ตะกร้าของคุณยังว่าง</h1>;

    return (
        <section className='py-4 container'>
            <div className='row justify-content-center'>
                <div className='col-12'>
                    <h5>ตะกร้า ({totalUniqueItems}) </h5>
                    <h5>ราคารวม: {cartTotal} บาท</h5>
                    <table className='table table-light table-hover m-0'>
                        <tbody>
                            {items.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <img src={item.img} alt={item.title} style={{ height: '6rem' }} />
                                    </td>
                                    <td>{item.title}</td>
                                    <td>{item.price} บาท</td>
                                    <td>
                                        <button className='btn btn-danger ms-2' onClick={() => removeItem(item.id)}>
                                            ลบ Item
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='mt-3'>
                        <Button className='btn btn-info d-inline' style={{ marginRight: '10px' }} onClick={CheckOut}>
                            Check Out
                        </Button>
                        <Modal show={showModal} onHide={handleClose} size="lg">
                            <Modal.Header>
                                <Modal.Title>Check Out</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <table className='table table-light table-hover m-0'>
                                    <tbody>
                                        {items.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <img src={item.img} alt={item.title} style={{ height: '6rem' }} />
                                                </td>
                                                <td>{item.title}</td>
                                                <td>{item.price} บาท</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </Modal.Body>
                            <Modal.Footer className='d-flex justify-content-between '>
                                <div>
                                    <h5>ราคารวม: {cartTotal} บาท</h5>
                                    <h5>เงินคงเหลือ: 500 บาท</h5>
                                </div>
                                <div className='d-flex justify-content-start'>
                                    <Button variant="secondary" onClick={handleClose}> ปิด </Button>
                                    <Button variant="secondary" style={{ marginLeft: '15px' }} value={money} onClick={showAlert}> สั่งซื้อ </Button>
                                </div>
                            </Modal.Footer>
                        </Modal>
                        <button className='btn btn-warning d-inline' onClick={emptyCart}>ล้างตะกร้า</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Cart;

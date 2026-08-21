import { useState,useEffect } from "react";
import React from 'react';
import { useCart } from "react-use-cart";

const Itemcard = (props) => {
    const {addItem,items} = useCart();
    const [isInCart, setIsInCart] = useState(false);

    useEffect(() => {
        const alreadyInCart = items.find(item => item.id === props.item.id);
        if (alreadyInCart) {
            setIsInCart(true);
        }
        else{
            setIsInCart(false);
        }
    },[items, props.item.id]);

    const handleAddToCart = () => {
        if (!isInCart) {
            addItem(props.item);
            setIsInCart(true);
            console.log("Product added to cart!");
        } else {
            console.log("Product is already in cart.");
        }
    }
    
    return (
        <div className="col-11 col-md-6 col-lg-3 mx-0 mb-4">
            <div className="card p-0 overflow-hidden h-100 shadow">
                <img src={props.img} className="card-img-top img-fluid" alt={props.title} />
                <div className="card-body text-center">
                    <h5 className="card-title">{props.title}</h5>
                    <h5 className="card-text">{props.pricefn} V-Bucks / {props.price} บาท</h5>
                    <p className="card-text">{props.desc}</p>
                    {isInCart ?
                    (
                        <button className="btn btn-success" disabled> อยู่ในตะกร้าแล้ว </button>
                    ) : 
                    (
                        <button className="btn btn-success" onClick={handleAddToCart}> เพิ่มลงตะกร้า </button>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Itemcard;

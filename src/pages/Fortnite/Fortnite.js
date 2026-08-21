import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home';
import Cart from './Cart';
import { CartProvider } from 'react-use-cart';
import './background.css'

function Fortnite() {
  return (
    <section className='fixed-background'>
      <CartProvider>
        <Home/>
        <Cart/>
      </CartProvider>
    </section>
  );
}

export default Fortnite;

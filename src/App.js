import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import React, { useState } from 'react';

function App() {
  const [openCartModal, setOpenCartModal] = useState(false);

  const hideCartHandler = () => {
    setOpenCartModal(false);
  };

  const openCartHandler = () => {
    setOpenCartModal(true);
  };

  return (
    <CartProvider>
      {openCartModal && <Cart onClose={hideCartHandler} />}
      <Header onCartClick={openCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;

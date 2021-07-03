import React, { useContext, useState } from 'react';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

// Props from App
const Cart = (props) => {
  const [isCheckOut, setCheckOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); //for POST request
  const [didSubmit, setDidSubmit] = useState(false);

  const [httpError, setHttpError] = useState();
  const cartCtx = useContext(CartContext); //cart data
  const totalAmount = `${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  // Handlers for CartItem
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const orderHandler = () => {
    setCheckOut(true);
  };
  // Send cart items to the DOM
  const cartItems = cartCtx.items.map((item) => (
    <CartItem
      key={item.id}
      name={item.name}
      amount={item.amount}
      price={item.price}
      onRemove={cartItemRemoveHandler.bind(null, item.id)}
      onAdd={cartItemAddHandler.bind(null, item)}
    />
  ));

  // Post data to the server
  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true); //state for request
    try {
      await fetch(
        'https://food-order-app-30143-default-rtdb.firebaseio.com/orders.json',
        {
          method: 'POST',
          body: JSON.stringify({
            user: userData,
            orderedItems: cartCtx.items,
          }),
        }
      );
    } catch (error) {
      props.onClose();
      setHttpError(error.message);
      return;
    }
    // Clean up
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  if (httpError) {
    return (
      <section className={classes.httpError}>
        <p>{httpError}</p>
      </section>
    );
  }
  // Cart Btns
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {!isCheckOut && <ul className={classes['cart-items']}>{cartItems}</ul>}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckOut && (
        <Checkout onSubmit={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckOut && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <React.Fragment>
      <p className={classes.success}>Successfully sent your order!</p>
      <button className={classes['success-btn']} onClick={props.onClose}>
        Close
      </button>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;

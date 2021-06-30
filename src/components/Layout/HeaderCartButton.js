import React, { useContext, useEffect, useState } from 'react';
import classes from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);
  //get a total count of items
  const numberOfCartItems = cartCtx.items.reduce((acc, item) => {
    return acc + item.amount;
  }, 0);
  //animation
  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ''
  }`;

  const { items } = cartCtx; //the dependency
  useEffect(() => {
    if (items.length === 0) return;
    setBtnIsHighlighted(true);
    //reset
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);
    //cleanup
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;

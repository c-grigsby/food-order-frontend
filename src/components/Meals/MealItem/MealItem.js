import React, { useContext } from 'react';
import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';
import CartContext from '../../../store/cart-context';

// Gets props from AvailableMeals
const MealItem = (props) => {
  const cartCtx = useContext(CartContext);
  // To display price
  const price = `$${props.price.toFixed(2)}`;

  // Handler sent to MealItemForm
  const addToCartHandler = (amount) => {
    console.log(props.id);
    const cartObj = {
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    };
    cartCtx.addItem(cartObj);
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
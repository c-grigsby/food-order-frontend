import React, { useRef, useState } from 'react';
import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';

// Props from MealItem
const MealItemForm = (props) => {
  const [amountIsValid, setAmountisValid] = useState(true);
  const amountInputRef = useRef();

  //onSubmit
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;
    // input validation
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 20
    ) {
      setAmountisValid(false);
      return;
    }
    // Handler from MealItem
    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label='Amount'
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '20',
          defaultValue: '1',
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-20).</p>}
    </form>
  );
};

export default MealItemForm;

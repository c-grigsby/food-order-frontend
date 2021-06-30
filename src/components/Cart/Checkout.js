import { useState, useRef } from 'react';
import classes from './Checkout.module.css';

// Props from Cart
const Checkout = (props) => {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const [formValidity, setFormValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const isEmpty = (value) => value.trim() === '';
  const isFive = (value) => value.trim().length === 5;

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalIsValid = isFive(enteredPostalCode);

    setFormValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalIsValid;

    if (!formIsValid) {
      return;
    }

    const userData = {
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode,
    };
    props.onSubmit(userData); // submit
  };

  const nameClasses = `${formValidity.name ? '' : classes.invalid}`;
  const streetClasses = `${formValidity.street ? '' : classes.invalid}`;
  const cityClasses = `${formValidity.city ? '' : classes.invalid}`;
  const postalCodeClasses = `${
    formValidity.postalCode ? '' : classes.invalid
  } `;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${nameClasses}`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formValidity.name && <p>Please enter a valid name</p>}
      </div>
      <div className={`${classes.control} ${streetClasses}`}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formValidity.street && (
          <p className={classes.invalid}>Please enter a valid street</p>
        )}
      </div>
      <div className={`${classes.control} ${cityClasses}`}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formValidity.city && (
          <p className={classes.invalid}>Please enter a valid city</p>
        )}
      </div>
      <div className={`${classes.control} ${postalCodeClasses}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeInputRef} />
        {!formValidity.postalCode && (
          <p className={classes.invalid}>
            Please enter a valid postal code <br />
            (5 characters)
          </p>
        )}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;

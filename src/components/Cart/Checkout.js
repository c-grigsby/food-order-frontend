import React, { useState } from 'react';
import classes from './Checkout.module.css';
import useInput from '../../hooks/use-input';

// Props from Cart
const Checkout = (props) => {
  const [errorMessage, setErrorMessage] = useState();
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputIsInvalid,
    valueChangeHandler: nameInputChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputIsInvalid,
    valueChangeHandler: emailInputChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes('@') && value.trim().length >= 6);

  const {
    value: enteredStreet,
    isValid: enteredStreetIsValid,
    hasError: streetInputIsInvalid,
    valueChangeHandler: streetInputChangeHandler,
    inputBlurHandler: streetInputBlurHandler,
    reset: resetStreetInput,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredPostalCode,
    isValid: enteredPostalCodeIsValid,
    hasError: postalCodeInputIsInvalid,
    valueChangeHandler: postalCodeInputChangeHandler,
    inputBlurHandler: postalCodeInputBlurHandler,
    reset: resetPostalCodeInput,
  } = useInput((value) => value.trim() !== '');

  // For 'invalid' css styling
  const nameInputClasses = ` ${nameInputIsInvalid ? classes.invalid : ''}`;
  const emailInputClasses = `${emailInputIsInvalid ? classes.invalid : ''}`;
  const streetInputClasses = `${streetInputIsInvalid ? classes.invalid : ''}`;
  const postalCodeInputClasses = `${
    postalCodeInputIsInvalid ? classes.invalid : ''
  }`;

  // On submit
  const formSubmissionHandler = (event) => {
    event.preventDefault();
    let formIsValid;

    formIsValid =
      enteredNameIsValid &&
      enteredEmailIsValid &&
      enteredStreetIsValid &&
      enteredPostalCodeIsValid;
    if (!formIsValid) {
      setErrorMessage(
        <p className={classes.invalid}>Please submit the requested fields</p>
      );
      return;
    }
    setErrorMessage();
    const userData = {
      first_name: enteredName,
      email: enteredEmail,
      street: enteredStreet,
      postal_code: enteredPostalCode,
    };
    props.onSubmit(userData); //submits form to backend
    resetNameInput();
    resetStreetInput();
    resetPostalCodeInput();
    resetEmailInput();
    setErrorMessage();
  };

  return (
    <form className={classes.form} onSubmit={formSubmissionHandler}>
      <div className={`${classes.control} ${nameInputClasses}`}>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          id='name'
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
      </div>
      <div className={`${classes.control} ${emailInputClasses}`}>
        <label htmlFor='name'>Email</label>
        <input
          type='email'
          id='email'
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
        />
        {/* {emailInputIsInvalid && <p>Please enter a valid email.</p>} */}
      </div>
      <div className={`${classes.control} ${streetInputClasses}`}>
        <label htmlFor='name'>Street</label>
        <input
          type='text'
          id='text'
          onChange={streetInputChangeHandler}
          onBlur={streetInputBlurHandler}
          value={enteredStreet}
        />
      </div>
      <div className={`${classes.control} ${postalCodeInputClasses}`}>
        <label htmlFor='name'>Postal Code</label>
        <input
          type='text'
          id='text'
          onChange={postalCodeInputChangeHandler}
          onBlur={postalCodeInputBlurHandler}
          value={enteredPostalCode}
        />
        {/* {postalCodeInputIsInvalid && <p>Please enter a valid postal code.</p>} */}
      </div>
      {errorMessage}
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

import React, { useState } from 'react';
import classes from './Checkout.module.css';
import useInput from '../../hooks/use-input';

// Props from Cart
const Checkout = (props) => {
  const [errorMessage, setErrorMessage] = useState();
  const {
    value: enteredFirstName,
    isValid: enteredFirstNameIsValid,
    hasError: firstNameInputIsInvalid,
    valueChangeHandler: firstNameInputChangeHandler,
    inputBlurHandler: firstNameInputBlurHandler,
    reset: resetFirstNameInput,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredLastName,
    isValid: enteredLastNameIsValid,
    hasError: lastNameInputIsInvalid,
    valueChangeHandler: lastNameInputChangeHandler,
    inputBlurHandler: lastNameInputBlurHandler,
    reset: resetLastNameInput,
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
    value: enteredCity,
    isValid: enteredCityIsValid,
    hasError: cityInputIsInvalid,
    valueChangeHandler: cityInputChangeHandler,
    inputBlurHandler: cityInputBlurHandler,
    reset: resetCityInput,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredPostalCode,
    isValid: enteredPostalCodeIsValid,
    hasError: postalCodeInputIsInvalid,
    valueChangeHandler: postalCodeInputChangeHandler,
    inputBlurHandler: postalCodeInputBlurHandler,
    reset: resetPostalCodeInput,
  } = useInput((value) => value.trim() !== '');

  const firstNameInputClasses = ` ${
    firstNameInputIsInvalid ? classes.invalid : ''
  }`;

  const lastNameInputClasses = `${
    lastNameInputIsInvalid ? classes.invalid : ''
  }`;

  const emailInputClasses = `${emailInputIsInvalid ? classes.invalid : ''}`;

  const streetInputClasses = `${streetInputIsInvalid ? classes.invalid : ''}`;

  const cityInputClasses = `${cityInputIsInvalid ? classes.invalid : ''}`;

  const postalCodeInputClasses = `${
    postalCodeInputIsInvalid ? classes.invalid : ''
  }`;

  // On submit
  const formSubmissionHandler = (event) => {
    event.preventDefault();
    let formIsValid;
    // Form Validation
    formIsValid =
      enteredFirstNameIsValid &&
      enteredLastNameIsValid &&
      enteredEmailIsValid &&
      enteredCityIsValid &&
      enteredStreetIsValid &&
      enteredPostalCodeIsValid;
    if (!formIsValid) {
      setErrorMessage(<p>Please submit the requested fields</p>);
      return;
    }
    const userData = {
      first_name: enteredFirstName,
      last_name: enteredLastName,
      email: enteredEmail,
      street: enteredStreet,
      city: enteredCity,
      postal_code: enteredPostalCode,
    };
    props.onSubmit(userData); // submit
    resetFirstNameInput();
    resetLastNameInput();
    resetEmailInput();
    resetStreetInput();
    resetCityInput();
    resetPostalCodeInput();
    setErrorMessage();
    console.log('Submitted!');
  };

  return (
    <form className={classes.form} onSubmit={formSubmissionHandler}>
      <div className={`${classes.control} ${firstNameInputClasses}`}>
        {errorMessage}
        <label htmlFor='name'>First Name</label>
        <input
          type='text'
          id='name'
          onChange={firstNameInputChangeHandler}
          onBlur={firstNameInputBlurHandler}
          value={enteredFirstName}
        />
        {firstNameInputIsInvalid && <p>Please enter first name</p>}
      </div>
      <div className={`${classes.control} ${lastNameInputClasses}`}>
        <label htmlFor='name'>Last Name</label>
        <input
          type='text'
          id='name'
          onChange={lastNameInputChangeHandler}
          onBlur={lastNameInputBlurHandler}
          value={enteredLastName}
        />
        {lastNameInputIsInvalid && <p>Please enter last name</p>}
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
        {emailInputIsInvalid && <p>Please enter a valid email.</p>}
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
        {streetInputIsInvalid && <p>Please enter a valid street.</p>}
      </div>
      <div className={`${classes.control} ${cityInputClasses}`}>
        <label htmlFor='name'>City</label>
        <input
          type='text'
          id='text'
          onChange={cityInputChangeHandler}
          onBlur={cityInputBlurHandler}
          value={enteredCity}
        />
        {cityInputIsInvalid && <p>Please enter a valid city.</p>}
      </div>
      <div className={`${classes.control} ${postalCodeInputClasses}`}>
        <label htmlFor='name'>PostalCode</label>
        <input
          type='text'
          id='text'
          onChange={postalCodeInputChangeHandler}
          onBlur={postalCodeInputBlurHandler}
          value={enteredPostalCode}
        />
        {postalCodeInputIsInvalid && <p>Please enter a valid postal code.</p>}
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

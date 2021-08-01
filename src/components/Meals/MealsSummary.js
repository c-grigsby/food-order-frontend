import classes from './MealsSummary.module.css';
import React from 'react';

const MealsSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>Delicious Food, Delivered</h2>
      <p>
        Choose from our broad selection of available meals and enjoy a delicious
        lunch or dinner at home.
      </p>
      <p>
        All of our meals are cooked with high-quality ingredients, and prepared
        to order by experienced chefs.
      </p>
    </section>
  );
};

export default MealsSummary;

import React, { useEffect, useState } from 'react';
import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      const responseData = await fetch(
        'https://food-order-app-30143-default-rtdb.firebaseio.com/meals.json'
      ).then((request) => request.json());

      console.log(responseData);
      const loadedMeals = [];
      // fetched data is an obj
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals); //update state
      console.log(loadedMeals);
    };
    fetchMeals();
    setIsLoading(false);
  }, []);

  // Handle loading
  if (isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    //send to MealItem
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <div className={classes.container}>
      <section className={classes.meals}>
        <Card className={classes.card}>
          <ul>{mealsList}</ul>
        </Card>
      </section>
    </div>
  );
};

export default AvailableMeals;

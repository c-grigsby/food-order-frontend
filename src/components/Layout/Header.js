import HeaderCartButton from './HeaderCartButton';
import classes from './Header.module.css';
import logo from '../../assets/leaf.png';
import mealsImage from '../../assets/meals.jpg';
import { React, Fragment } from 'react';

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>
          Foodist
          <img className={classes.icon} src={logo} alt=''></img>
        </h1>
        <HeaderCartButton onClick={props.onCartClick} />
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt='' />
      </div>
    </Fragment>
  );
};

export default Header;

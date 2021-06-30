import React, { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  // ADD
  if (action.type === 'ADD') {
    const newTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      //current state
      updatedItems = [...state.items];
      //update
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    // new state object
    return {
      items: updatedItems,
      totalAmount: newTotalAmount,
    };
  }
  // REMOVE
  if (action.type === 'REMOVE') {
    //get the index
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    if (!existingItem) return;
    //update total
    let updatedTotalAmount = state.totalAmount - existingItem.price;
    if (updatedTotalAmount < 0) {
      updatedTotalAmount = 0;
    }
    //update item
    let updatedItems = [];
    if (existingItem.amount === 1) {
      //remove the item
      updatedItems = state.items.filter((item) => item.id !== action.id);
      console.log(updatedItems);
    } else {
      //update the item
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    // new state object
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState;
};

// CartProvider
const CartProvider = (props) => {
  //useReducer
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  //Obj Handlers
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: 'ADD', item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE', id: id });
  };

  // Object to send
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: (item) => {
      return addItemToCartHandler(item);
    },
    removeItem: (id) => {
      return removeItemFromCartHandler(id);
    },
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;

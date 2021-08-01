import CartContext from './cart-context';
import React, { useReducer } from 'react';

const defaultCartState = {
    items: [],
    totalAmount: 0,
};

const cartReducer = (state, action) => {
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
   
    if (action.type === 'REMOVE') {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );
        const existingItem = state.items[existingCartItemIndex];
        if (!existingItem) return;
     
        let updatedTotalAmount = state.totalAmount - existingItem.price;
        if (updatedTotalAmount < 0) {
            updatedTotalAmount = 0;
        }
        //update item
        let updatedItems = [];
        if (existingItem.amount === 1) {
            
            updatedItems = state.items.filter((item) => item.id !== action.id);
            console.log(updatedItems);
        } else {
            const updatedItem = {
                ...existingItem,
                amount: existingItem.amount - 1,
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
    }
    if (action.type === 'Clear') {
        return defaultCartState;
    }
    return defaultCartState;
};

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(
        cartReducer,
        defaultCartState
    );

    const addItemToCartHandler = (item) => {
        dispatchCartAction({ type: 'ADD', item: item });
    };
    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({ type: 'REMOVE', id: id });
    };
    const clearCartHandler = () => {
        dispatchCartAction({
            type: 'CLEAR',
        });
    };
    //obj to send
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: (item) => {
            return addItemToCartHandler(item);
        },
        removeItem: (id) => {
            return removeItemFromCartHandler(id);
        },
        clearCart: clearCartHandler,
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};
export default CartProvider;

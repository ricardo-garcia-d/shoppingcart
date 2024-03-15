import React, { createContext, useReducer, useEffect } from 'react';
import productsData from '../data/products.json';
import { cartReducer } from './Reducers'; // Ensure that the path is correct

const CartContext = createContext();

const initialState = {
  products: productsData.map(p => ({ ...p, price: parseFloat(p.price) })),
  cart: JSON.parse(localStorage.getItem('cart')) || [],
  productFilter: "All",
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const updateProductFilter = (category) => {
    dispatch({ type: "FILTER_BY_CATEGORY", payload: category });
  };


  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider value={{ state, dispatch, updateProductFilter }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider};

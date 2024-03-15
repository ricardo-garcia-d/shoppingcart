import React, { useContext } from 'react';
import { CartContext } from '../context/Context';
import Rating from './Rating'; 
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

const SingleProduct = ({ prod }) => {
  const {
    state: { cart },
    dispatch,
  } = useContext(CartContext);

  const itemInCart = cart.find((item) => item.id === prod.id);

  const incrementQty = () => {
    dispatch({ type: 'CHANGE_CART_QTY', payload: { id: prod.id, qty: 1 } });
  };

  const decrementQty = () => {
    const item = cart.find((item) => item.id === prod.id);
    if (item && item.qty > 1) {
      dispatch({ type: 'CHANGE_CART_QTY', payload: { id: prod.id, qty: -1 } });
    }
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={prod.image} alt={prod.name} className="product-image" />
      </div>
      <div className="product-info">
        <h3 className="product-name">{prod.name}</h3>
        <p className="product-price">${prod.price}</p>
        <Rating rating={prod.ratings} />
        {itemInCart ? (
          <>
            <div className="quantity-modifier">
              {itemInCart.qty > 1 && (
                <AiOutlineMinus onClick={decrementQty} style={{ cursor: 'pointer' }} />
              )}
              <span>{itemInCart.qty}</span>
              <AiOutlinePlus onClick={incrementQty} style={{ cursor: 'pointer' }} />
            </div>
            <button
              className="remove-from-cart-btn"
              onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: prod })}
            >
              Remove from cart
            </button>
          </>
        ) : (
          <button
            className="add-to-cart-btn"
            onClick={() => dispatch({ type: 'ADD_TO_CART', payload: prod })}
          >
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
};

export default SingleProduct

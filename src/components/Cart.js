import React, { useContext, useEffect, useState } from "react";
import { ListGroup, Button, Row, Col, Image } from "react-bootstrap";
import { CartContext } from "../context/Context";
import Rating from "./Rating";
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

const Cart = () => {
  const { state: { cart }, dispatch } = useContext(CartContext);
  const [total, setTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    setTotal(cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0));
    setItemCount(cart.reduce((acc, curr) => acc + curr.qty, 0));
  }, [cart]);

  const handleRemoveFromCart = (id) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: { id },
    });
  };

  const incrementQty = (id) => {
    dispatch({
      type: "CHANGE_CART_QTY",
      payload: { id, qty: 1 },
    });
  };

  const decrementQty = (id) => {
    const item = cart.find((item) => item.id === id);
    if (item && item.qty > 1) {
      dispatch({
        type: "CHANGE_CART_QTY",
        payload: { id, qty: -1 },
      });
    }
  };

  return (
    <div className="home">
      <div className="productContainer">
        <ListGroup>
          {cart.map((prod) => (
            <ListGroup.Item key={prod.id} className="cart-item-row">
              <Row>
                <Col md={2}>
                  <Image src={prod.image} alt={prod.name} fluid rounded />
                </Col>
                <Col md={2} className="cart-item-col">
                  <span>{prod.name}</span>
                </Col>
                <Col md={2} className="cart-item-col">${prod.price}</Col>
                <Col md={2} className="cart-item-col">
                  <Rating rating={prod.ratings} />
                </Col>
                <Col md={2} className="cart-item-col quantity-modifier">
                  <AiOutlineMinus onClick={() => decrementQty(prod.id)} style={{ cursor: 'pointer' }} />
                  <span className="mx-2">Qty: {prod.qty}</span>
                  <AiOutlinePlus onClick={() => incrementQty(prod.id)} style={{ cursor: 'pointer' }} />
                </Col>
                <Col md={2} className="cart-item-col">
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => handleRemoveFromCart(prod.id)}
                  >
                    Remove
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="filters summary">
        <span className="title">Subtotal ({itemCount}) items</span>
        <span style={{ fontWeight: 700, fontSize: 20 }}>Total: $ {total.toFixed(2)}</span>
        <Button type="button" disabled={cart.length === 0}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;

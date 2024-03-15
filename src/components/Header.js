import React, { useContext } from 'react';
import { Container, Navbar, Nav, Dropdown, Badge } from "react-bootstrap";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { CartContext } from "../context/Context";
import { AiFillDelete, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { Button } from "react-bootstrap";


const Header = () => {
    const { state, dispatch } = useContext(CartContext);
    const { cart } = state;

    // Function to dispatch the REMOVE_FROM_CART action
    const handleRemoveFromCart = (product) => {
        dispatch({
            type: "REMOVE_FROM_CART",
            payload: product
        });
    };

    const incrementQty = (id) => {
        // Increment item quantity
        dispatch({
            type: "CHANGE_CART_QTY",
            payload: { id, qty: 1 },
        });
    };

    const decrementQty = (id) => {
        // Decrement item quantity
        const item = cart.find((item) => item.id === id);
        if (item.qty > 1) {
            dispatch({
                type: "CHANGE_CART_QTY",
                payload: { id, qty: -1 },
            });
        }
    };

    const totalQuantity = cart.reduce((total, item) => total + item.qty, 0);



    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>
                    <Link to="/">Shopping Page</Link>
                </Navbar.Brand>
                <Nav>
                    <Dropdown alignRight>
                        <Dropdown.Toggle variant="success" className="cart-icon">
                            <MdOutlineShoppingCart color="white" fontSize="25px" />
                            <Badge>{totalQuantity}</Badge>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className='header-dropdown-menu' style={{ minWidth: 370 }}>
                            {cart.length > 0 ? (
                                <>
                                {cart.map(prod => (
                                    <Dropdown.Item as="div" className='dropdown-item'>
                                    <span className="dropdown-item-text">{prod.name} - ${prod.price.toFixed(2)} - {prod.qty} pcs </span>
                                    <span className="dropdown-item-icons">
                                        <AiOutlineMinus onClick={() => decrementQty(prod.id)} style={{ cursor: 'pointer', marginLeft: '5px' }} />
                                        <AiOutlinePlus onClick={() => incrementQty(prod.id)} style={{ cursor: 'pointer', marginLeft: '5px' }} />
                                        <AiFillDelete fontSize="20px" style={{ cursor: "pointer" }} onClick={() => handleRemoveFromCart(prod)} />
                                    </span>
                                    </Dropdown.Item>
                                ))}
                                <Dropdown.Divider />
                                <Dropdown.Item>
                                    Total: ${cart.reduce((acc, prod) => acc + prod.price * prod.qty, 0).toFixed(2)}
                                </Dropdown.Item>
                                <Dropdown.Item as="div">
                                    <Link to="/cart">
                                    <Button variant="primary">Go to Cart</Button>
                                    </Link>
                                    </Dropdown.Item>
                                
                                </>
                            ) : (
                                <span style={{ padding: 10 }}>Cart is empty!</span>
                            )
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;

export const cartReducer = (state, action) => {
    switch (action.type) {
      case "ADD_TO_CART":
        const inCart = state.cart.find((item) => item.id === action.payload.id);

      // If item is in cart, increase the quantity
      if (inCart) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, qty: item.qty + 1 }
              : item
          ),
        };
      } else {
        return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
      }

      case "REMOVE_FROM_CART":
        return {
          ...state,
          cart: state.cart.filter((item) => item.id !== action.payload.id),
        };
      case "CHANGE_CART_QTY":
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id ? { ...item, qty:Math.max(item.qty + action.payload.qty, 1) } : item
          ),
        };
      case "FILTER_BY_CATEGORY":
        return {...state, productFilter: action.payload};
        
      default:
        return state;
    }
  };
  
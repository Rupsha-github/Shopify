export const cartReducer = (state, { type, payload }) => {
  switch (type) {
    case "ADD_TO_CART":
      const productInCart = state.cart.find((p) => p.id === payload.product.id);
      if (productInCart) {
        return state;
      }
      return {
        ...state,
        // Initialize quantity to 1 when adding
        cart: [...state.cart, { ...payload.product, quantity: 1 }],
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((p) => p.id !== payload.id),
      };

    case "INCREMENT_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((product) =>
          product.id === payload.id
            ? { ...product, quantity: (product.quantity || 1) + 1 }
            : product
        ),
      };

    case "DECREMENT_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((product) =>
          product.id === payload.id
            ? { ...product, quantity: Math.max((product.quantity || 1) - 1, 1) } // Prevent going below 1
            : product
        ),
      };

    default:
      return state;
  }
};
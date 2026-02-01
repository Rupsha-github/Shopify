export const getTotalCartAmount = (cart) =>
  cart?.length > 0 &&
  cart.reduce(
    (total, product) => total + product.price * (product.quantity || 1),
    0
  );
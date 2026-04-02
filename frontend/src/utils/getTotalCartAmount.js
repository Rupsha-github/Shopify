export const getTotalCartAmount = (cart) => {
    return cart?.reduce((total, item) => {
        if (!item) return total;
        return total + (item.price * (item.quantity || 1));
    }, 0) || 0;
};
export const findProductInCart = (cart, targetId) => {
    return cart?.some(item => item && (item._id === targetId || item.id === targetId));
};
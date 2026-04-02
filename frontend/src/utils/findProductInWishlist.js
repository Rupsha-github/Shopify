export const findProductInWishlist = (wishlist, targetId) => {
    return wishlist?.some(item => item && (item._id === targetId || item.id === targetId));
};
export const wishlistReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_WISHLIST":
            const productInWishlist = state.wishlist.find((p) => p.id === action.payload.product.id);
            if (productInWishlist) {
                return state;
            }
            return {
                ...state,
                wishlist: [...state.wishlist, action.payload.product],
            };
        case "REMOVE_FROM_WISHLIST":
            return {
                ...state,
                wishlist: state.wishlist.filter((p) => p.id !== action.payload.id),
            };
        default:
            return state;
    }
}
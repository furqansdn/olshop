export const cartReducers = (state = { cartList: [] }, action) => {
  switch (action.type) {
    case 'ADD_CART_ITEM':
      const item = action.payload;
      const existItem = state.cartList.find(
        (el) => el.product === item.product
      );

      if (existItem) {
        return {
          ...state,
          cartList: state.cartList.map((el) => {
            return el.product === existItem.product ? item : el;
          }),
        };
      }
      return { ...state, cartList: [...state.cartList, item] };
    default:
      return state;
  }
};

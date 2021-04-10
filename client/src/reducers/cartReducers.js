export const cartReducers = (
  state = { cartList: [], loading: false, currentId: '' },
  action
) => {
  switch (action.type) {
    case 'ADD_CART_ITEM_REQUEST':
      return { ...state, loading: true, currentId: action.payload };
    case 'ADD_CART_ITEM_SUCCESS':
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
          loading: false,
        };
      }
      return { ...state, cartList: [...state.cartList, item], loading: false };
    case 'ADD_CART_ITEM_FAILED':
      return { ...state, error: action.payload, loading: false };
    case 'DELETE_CART_ITEM':
      return {
        ...state,
        cartList: state.cartList.filter((el) => el.product !== action.payload),
      };
    default:
      return state;
  }
};

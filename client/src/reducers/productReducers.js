export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case 'PRODUCT_LIST_REQUEST':
      return { ...state, loading: true, products: [], error: '' };
    case 'PRODUCT_LIST_SUCCESS':
      return { ...state, loading: false, products: action.payload, error: '' };
    case 'PRODUCT_LIST_FAILED':
      return { ...state, loading: false, error: action.payload };
    case 'DELETE_PRODUCT_LIST_SUCCESS':
      return {
        ...state,
        products: state.products.filter((el) => el._id !== action.payload),
        error: '',
      };
    case 'DELETE_PRODUCT_LIST_FAILED':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

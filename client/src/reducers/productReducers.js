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

export const productFormReducer = (
  state = { error: '', loading: false, state: 'add' },
  action
) => {
  switch (action.type) {
    case 'PRODUCT_FORM_ACCESS':
      return { ...state, state: action.payload, error: '' };
    case 'PRODUCT_FORM_SUBMIT_REQUEST':
      return { ...state, error: '', loading: true };
    case 'PRODUCT_FORM_SUBMIT_SUCCESS':
      return { ...state, error: '', loading: false };
    case 'PRODUCT_FORM_SUBMIT_FAILED':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export const productReducer = (
  state = { error: '', loading: false, product: {} },
  action
) => {
  switch (action.type) {
    case 'PRODUCT_REQUEST':
      return { ...state, error: '', loading: true };
    case 'PRODUCT_SUCCESS':
      return { ...state, error: '', loading: false, product: action.payload };
    case 'PRODUCT_FAILURE':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

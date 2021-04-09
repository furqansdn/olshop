export const categoryReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case 'CATEGORIES_REQUEST':
      return { categories: [] };
    case 'CATEGORIES_SUCCESS':
      return { categories: action.payload };
    case 'CATEGORIES_FAIL':
      return { error: action.payload, categories: [] };
    default:
      return state;
  }
};

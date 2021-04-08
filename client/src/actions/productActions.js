import api from '../api';

export const listProducts = (categoryId) => async (dispatch) => {
  try {
    dispatch({ type: 'PRODUCT_LIST_REQUEST' });
    let params = {};
    if (categoryId) {
      params['categoryId'] = categoryId;
    }
    const { data } = await api.get('/products', { params });

    dispatch({ type: 'PRODUCT_LIST_SUCCESS', payload: data.data });
  } catch (error) {
    dispatch({ type: 'PRODUCT_LIST_FAIL', payload: error.message });
  }
};

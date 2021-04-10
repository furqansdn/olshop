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
    dispatch({ type: 'PRODUCT_LIST_FAILED', payload: error.message });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    const { currentUser } = getState().auth;

    const { data } = await api.delete(`/products/${id}`);

    if (data.status === 'success') {
      dispatch({ type: 'DELETE_PRODUCT_LIST_SUCCESS', payload: id });
    }
  } catch (error) {
    dispatch({ type: 'DELETE_PRODUCT_LIST_FAILED', payload: error.message });
  }
};

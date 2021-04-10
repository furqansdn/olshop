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

    const { data } = await api.delete(`/products/${id}`, {
      headers: { Authorization: `Bearer ${currentUser.token}` },
    });

    if (data.status === 'success') {
      dispatch({ type: 'DELETE_PRODUCT_LIST_SUCCESS', payload: id });
    }
  } catch (error) {
    dispatch({ type: 'DELETE_PRODUCT_LIST_FAILED', payload: error.message });
  }
};

export const addProduct = (obj, history) => async (dispatch, getState) => {
  try {
    const { currentUser } = getState().auth;

    dispatch({ type: 'PRODUCT_FORM_SUBMIT_REQUEST' });
    let formData = new FormData();

    for (let key in obj) {
      formData.append(key, obj[key]);
    }
    await api.post('/products', formData, {
      headers: { Authorization: `Bearer ${currentUser.token}` },
    });

    dispatch({ type: 'PRODUCT_FORM_SUBMIT_SUCCESS' });

    history.push('/');
  } catch (error) {
    dispatch({ type: 'PRODUCT_FORM_SUBMIT_FAILED', payload: error.message });
  }
};

export const editProduct = (id, obj, history) => async (dispatch, getState) => {
  const { currentUser } = getState().auth;

  dispatch({ type: 'PRODUCT_FORM_SUBMIT_REQUEST' });

  let formData = new FormData();

  if (!obj.image) delete obj.image;

  for (let key in obj) {
    formData.append(key, obj[key]);
  }

  await api.patch(`/products/${id}`, formData, {
    headers: { Authorization: `Bearer ${currentUser.token}` },
  });

  dispatch({ type: 'PRODUCT_FORM_SUBMIT_SUCCESS' });

  history.push('/');
};
export const getOneProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'PRODUCT_REQUEST' });

    const { data } = await api.get(`/products/${id}`);

    dispatch({ type: 'PRODUCT_SUCCESS', payload: data.data });
  } catch (error) {
    dispatch({ type: 'PRODUCT_FAILURE', payload: error.message });
  }
};

import api from '../api';

export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch({ type: 'CATEGORIES_REQUEST' });
    const { data } = await api.get('/category');
    dispatch({ type: 'CATEGORIES_SUCCESS', payload: data.data });
  } catch (error) {
    dispatch({ type: 'CATEGORIES_FAIL', payload: error.message });
  }
};

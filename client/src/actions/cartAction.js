import api from '../api';

export const addToCart = (id, qty = 1) => async (dispatch, getState) => {
  const { data } = await api.get(`/product/${id}`);

  // dispatch({ type: 'ADD_CART_ITEM', payload: {
  //   product: data._id
  // }})
  console.log(data);
};

import api from '../api';

export const addToCart = (id, qty = 1) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'ADD_CART_ITEM_REQUEST', payload: id });
    const { data } = await api.get(`/products/${id}`);

    const item = data.data;
    dispatch({
      type: 'ADD_CART_ITEM_SUCCESS',
      payload: {
        product: item._id,
        title: item.title,
        image: item.image,
        price: item.price,
        stock: item.stock,
        quantity: qty,
      },
    });

    localStorage.setItem('cartList', JSON.stringify(getState().cart.cartList));
  } catch (error) {
    dispatch({ type: 'ADD_CART_ITEM_FAILED', payload: error.message });
  }

  // localStorage.setItem('cartList', getState().cart.cartList);
};

export const deleteFromCart = (id) => (dispatch, getState) => {
  dispatch({ type: 'DELETE_CART_ITEM', payload: id });
  localStorage.setItem('cartList', JSON.stringify(getState().cart.cartList));
};

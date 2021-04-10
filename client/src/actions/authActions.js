import api from '../api';

export const login = (formData, history) => async (dispatch) => {
  try {
    dispatch({ type: 'USER_LOGIN_REQUEST' });

    const { data } = await api.post('/auth/signin', formData);

    localStorage.setItem('currentUser', JSON.stringify(data.data));
    dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data.data });
    history.push('/');
  } catch (error) {
    dispatch({ type: 'USER_LOGIN_FAILED', payload: error.message });
  }
};

export const register = (formData, history) => async (dispatch) => {
  try {
    dispatch({ type: 'USER_REGISTER_REQUEST' });

    const { data } = await api.post('/auth/signup', formData);

    localStorage.setItem('currentUser', JSON.stringify(data.data));
    dispatch({ type: 'USER_REGISTER_SUCCESS', payload: data.data });
    history.push('/');
  } catch (error) {
    dispatch({ type: 'USER_REGISTER_FAILED', payload: error.message });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('currentUser');
  dispatch({ type: 'USER_LOGOUT' });
};

import api from '../api';

export const login = (formData, history) => async (dispatch) => {
  try {
    dispatch({ type: 'USER_LOGIN_REQUEST' });

    const { data } = await api.post('/auth/signin', formData);

    const state = { ...data.data.user, token: data.data.token };
    localStorage.setItem('currentUser', JSON.stringify(state));
    dispatch({ type: 'USER_LOGIN_SUCCESS', payload: state });
    history.push('/');
  } catch (error) {
    dispatch({ type: 'USER_LOGIN_FAILED', payload: error.message });
  }
};

export const register = (formData, history) => async (dispatch) => {
  try {
    dispatch({ type: 'USER_REGISTER_REQUEST' });

    const { data } = await api.post('/auth/signup', formData);

    const state = { ...data.data.user, token: data.data.token };
    localStorage.setItem('currentUser', JSON.stringify(state));
    dispatch({ type: 'USER_REGISTER_SUCCESS', payload: state });
    history.push('/');
  } catch (error) {
    dispatch({ type: 'USER_REGISTER_FAILED', payload: error.message });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('currentUser');
  dispatch({ type: 'USER_LOGOUT' });
};

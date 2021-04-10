export const authReducer = (state = { currentUser: {} }, action) => {
  switch (action.type) {
    case 'USER_LOGIN_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'USER_LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
        error: '',
      };
    case 'USER_LOGIN_FAILED':
      return { ...state, loading: false, error: action.payload };
    case 'USER_REGISTER_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'USER_REGISTER_SUCCESS':
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
        error: '',
      };
    case 'USER_REGISTER_FAILED':
      return { ...state, loading: false, error: action.payload };
    case 'USER_LOGOUT':
      return {};
    default:
      return state;
  }
};

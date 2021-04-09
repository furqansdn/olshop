export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_LOGIN_REQUEST':
      return { ...state, loading: true };
    case 'USER_LOGIN_SUCCESS':
      return { ...state, loading: false, currentUser: action.payload };
    case 'USER_LOGIN_FAILED':
      return { ...state, loading: false, error: action.payload };
    case 'USER_REGISTER_REQUEST':
      return { ...state, loading: true };
    case 'USER_REGISTER_SUCCESS':
      return { ...state, loading: false, currentUser: action.payload };
    case 'USER_REGISTER_FAILED':
      return { ...state, loading: false, error: action.payload };
    case 'USER_LOGOUT':
      return {};
    default:
      return state;
  }
};

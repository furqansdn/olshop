import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { productListReducer } from './reducers/productReducers';
import { categoryReducer } from './reducers/categoryReducers';
import { authReducer } from './reducers/authReducers';
import { cartReducers } from './reducers/cartReducers';

const reducer = combineReducers({
  productList: productListReducer,
  categories: categoryReducer,
  auth: authReducer,
  cart: cartReducers,
});

const currentUserStorage = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser'))
  : null;

const currentCartStorage = localStorage.getItem('cartList')
  ? JSON.parse(localStorage.getItem('cartList'))
  : [];

const initialState = {
  auth: { currentUser: currentUserStorage },
  cart: { cartList: currentCartStorage },
};

let middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

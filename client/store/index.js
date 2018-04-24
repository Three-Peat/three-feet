import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import users from './users';
import products from './products';
import categories from './categories';
import cart from './cart';
import reviews from './reviews';
import orders from './orders';
import addresses from './address';

const reducer = combineReducers({
  user,
  products,
  categories,
  cart,
  reviews,
  users,
  orders,
  addresses,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './users';
export * from './products';
export * from './categories';
export * from './cart';
export * from './reviews';
export * from './orders';
export * from './address';

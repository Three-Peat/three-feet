import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART';
const POST_CART = 'POST_CART';

/**
 * INITIAL STATE
 */
const defaultCart = [];

/**
 * ACTION CREATORS
 */
const getCart = cart => ({ type: GET_CART, cart });
const postCart = cart => ({ type: POST_CART, cart });

/**
 * THUNK CREATORS
 */
export const fetchCart = cartId => dispatch =>
  axios
    .get(`/api/carts/${cartId}`)
    .then(res => dispatch(getCart(res.data || defaultCart)))
    .catch(err => console.log(err));

export const oneProduct = id => dispatch =>
  axios
    .get(`/api/carts/${id}`)
    .then(res => dispatch(postCart(res.data || defaultCart)))
    .catch(err => console.error(err));

/**
 * REDUCER
 */
export default function(state = defaultCart, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    case GET_PRODUCT:
      return action.product;
    default:
      return state;
  }
}

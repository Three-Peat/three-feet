import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART';
const POST_CART = 'POST_CART';
const ADD_TO_CART = 'ADD_TO_CART';

/**
 * INITIAL STATE
 */
const defaultState = {
  products: [],
};

/**
 * ACTION CREATORS
 */

const get = cart => ({ type: GET_CART, cart });
const create = cart => ({ type: POST_CART, cart });
const addToCart = product => ({ type: POST_CART, product });

/**
 * THUNK CREATORS
 */
export const fetchCart = cartId => dispatch =>
  axios
    .get(`/api/carts/`)
    .then(res => dispatch(get(res.data || defaultState)))
    .catch(err => console.log(err));

export const postCart = cart => dispatch =>
  axios
    .post(`/api/carts/`, cart)
    .then(res => dispatch(create(res.data || defaultState)))
    .catch(err => console.error(err));

/**
 * REDUCER
 */
export default function(state = defaultState, action) {
  switch (action.type) {
    case GET_CART:
      return {
        ...state,
        products: action.product,
      };
    case POST_CART:
      return {
        ...state,
        products: action.product,
      };
    default:
      return state;
  }
}

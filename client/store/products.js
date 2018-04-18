import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS';
const GET_PRODUCT = 'GET_PRODUCT';

/**
 * INITIAL STATE
 */
const defaultProducts = [];

/**
 * ACTION CREATORS
 */
const getProducts = products => ({ type: GET_PRODUCTS, products });
const getProduct = product => ({ type: GET_PRODUCT, product });

/**
 * THUNK CREATORS
 */
export const allProducts = () => dispatch =>
  axios
    .get('/api/products')
    .then(res => dispatch(getProducts(res.data || defaultProducts)))
    .catch(err => console.log(err));

export const oneProduct = id => dispatch =>
  axios
    .get(`/api/products/${id}`)
    .then(res => dispatch(getProduct(res.data || defaultProducts)))
    .catch(err => console.error(err));

/**
 * REDUCER
 */
export default function(state = defaultProducts, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    case GET_PRODUCT:
      return action.product;
    default:
      return state;
  }
}

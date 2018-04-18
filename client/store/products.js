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
const defaultState = {
  allProducts: [],
  selectedProduct: {},
};

/**
 * ACTION CREATORS
 */
const getProducts = products => ({ type: GET_PRODUCTS, products });
const getProduct = product => ({ type: GET_PRODUCT, product });

/**
 * THUNK CREATORS
 */
export const fetchProducts = () => dispatch =>
  axios
    .get('/api/products')
    .then(res => dispatch(getProducts(res.data || defaultState)))
    .catch(err => console.log(err));

export const fetchProduct = id => dispatch =>
  axios
    .get(`/api/products/${id}`)
    .then(res => dispatch(getProduct(res.data || defaultState)))
    .catch(err => console.error(err));

/**
 * REDUCER
 */
export default function(state = defaultState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        allProducts: action.products,
      };
    case GET_PRODUCT:
      return {
        ...state,
        selectedProduct: action.product,
      };
    default:
      return state;
  }
}

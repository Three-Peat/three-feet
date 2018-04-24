import axios from 'axios';
import history from '../history';
import { purchaseCart, emptyCart, fetchCart } from '.';
import { createAddress } from './address';

/**
 * ACTION TYPES
 */
const GET_ORDER = 'GET_ORDER';
const GET_ORDERS = 'GET_ORDERS';
const POST_ORDER = 'POST_ORDER';

/**
 * INITIAL STATE
 */
const defaultState = {
  allOrders: [],
  selectedOrder: {},
};

/**
 * ACTION CREATORS
 */

const getOrder = order => ({ type: GET_ORDER, order });
const getOrders = orders => ({ type: GET_ORDERS, orders });
const createOrder = (order, address) => ({ type: POST_ORDER, order, address });

/**
 * THUNK CREATORS
 */
export const fetchOrder = orderId => dispatch =>
  axios
    .get(`/api/orders/${orderId}`)
    .then(res => dispatch(getOrder(res.data || defaultState)))
    .catch(err => console.log(err));

export const fetchOrders = () => dispatch =>
  axios
    .get(`/api/orders`)
    .then(res => dispatch(getOrders(res.data || defaultState)))
    .catch(err => console.error(err));

export const buildOrder = (cart, address) => dispatch => {
  // axios
  //   .post('/api/addresses', address)
  //   .then(res => {
  //     dispatch(createAddress(res.data));
  //   })
  //   .then(newAddress => {
  //     console.log(newAddress);
  //     const addressId = newAddress.addressId;
  //   })
  //   .then(
  const addressId = address.id;
  axios
    .post(`/api/orders/`, { cart, addressId })
    .then(res => {
      dispatch(createOrder(res.data || defaultState));
      history.push('/after-order');
    })
    .then(() => dispatch(purchaseCart()))
    .catch(err => console.error(err));
};

/**
 * REDUCER
 */
export default function(state = defaultState, action) {
  switch (action.type) {
    case GET_ORDER:
      return action.order;

    case GET_ORDERS:
      return {
        ...state,
        allOrders: action.orders,
      };
    case POST_ORDER:
      return {
        ...state,
        allOrders: action.order,
      };
    default:
      return state;
  }
}

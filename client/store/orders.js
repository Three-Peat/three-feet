import axios from 'axios';
import history from '../history';

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
const createOrder = order => ({ type: POST_ORDER, order });

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

export const buildOrder = cart => dispatch => {
  axios
    .post(`/api/orders/`, cart)
    .then(res => dispatch(createOrder(res.data || defaultState)))
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

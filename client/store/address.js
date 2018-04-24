import axios from 'axios';

// Action Types
const GET_ADDRESS = 'GET_ADDRESS';
const GET_ADDRESSES = 'GET_ADDRESSES';
const POST_ADDRESS = 'POST_ADDRESS';

/**
 * INITIAL STATE
 */
const defaultState = {
  allAddresses: [],
  selectedAddress: {},
};

const getAddress = address => ({ type: GET_ADDRESS, address });
const getAddresses = addresses => ({ type: GET_ADDRESSES, addresses });
const postAddress = address => ({ type: POST_ADDRESS, address });

// Thunk Creator

export const fetchAddress = addressId => dispatch => {
  axios
    .get(`/api/addresses/${addressId}`)
    .then(res => dispatch(getAddress(res || defaultState)))
    .catch(err => console.errror(err));
};

export const fetchAddresses = () => dispatch => {
  axios
    .get('/api/addresses')
    .then(res => dispatch(getAddresses(res || defaultState)))
    .catch(err => console.error(err));
};

export const createAddress = address => dispatch => {
  axios
    .post('/api/addresses/', address)
    .then(res => res.data)
    .then(res => dispatch(postAddress(res || defaultState)))
    .catch(err => console.error(err));
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case POST_ADDRESS:
      return {
        ...state,
        selectedAddress: action.address,
      };

    case GET_ADDRESS:
      return {
        ...state,
        selectedAddress: action.address,
      };

    case GET_ADDRESSES:
      return action.addresses;

    default:
      return state;
  }
}

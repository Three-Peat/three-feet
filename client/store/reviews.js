import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_REVIEWS = 'GET_REVIEWS'
const GET_PRODUCT_REVIEWS = `GET_PRODUCT_REVIEWS`


/**
 * INITIAL STATE
 */
const defaultState = {
  allReviews: [],
  productReviews: [],
}

/**
 * ACTION CREATORS
 */
const getReviews = reviews => ({ type: GET_REVIEWS, reviews })
const getProductReviews = reviews => ({ type: GET_PRODUCT_REVIEWS, reviews })


/**
 * THUNK CREATORS
 */
export const fetchReviews = () =>
  dispatch =>
    axios.get('/api/reviews')
      .then(res =>
        dispatch(getReviews(res.data || defaultState)))
      .catch(err => console.log(err))

export const fetchProductReviews = productId =>
  dispatch =>
    axios.get(`/api/reviews/${productId}`)
      .then(res =>
        dispatch(getProductReviews(res.data || defaultState)))
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultState, action) {
  switch (action.type) {
    case GET_REVIEWS:
      return {
        ...state, allReviews: action.reviews
      }
    case GET_PRODUCT_REVIEWS:
      return {
        ...state, productReviews: action.reviews
      }
    default:
      return state
  }
}
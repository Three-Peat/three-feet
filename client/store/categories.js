import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CATEGORIES = 'GET_CATEGORIES'
const GET_CATEGORY = 'GET_CATEGORY'


/**
 * INITIAL STATE
 */
const defaultState = {
  allCategories: [],
  selectedCategory: {}
}

/**
 * ACTION CREATORS
 */
const getCategories = categories => ({ type: GET_CATEGORIES, categories })
const getCategory = category => ({ type: GET_CATEGORY, category })


/**
 * THUNK CREATORS
 */
export const fetchCategories = () =>
  dispatch =>
    axios.get('/api/categories')
      .then(res =>
        dispatch(getCategories(res.data || defaultState)))
      .catch(err => console.log(err))

export const fetchCategory = categoryId =>
  dispatch =>
    axios.get(`/api/categories/${categoryId}`)
      .then(res =>
        dispatch(getCategory(res.data || defaultState)))
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state, allCategories: action.categories
      }
    case GET_CATEGORY:
      return {
        ...state, selectedCategory: action.category
      }
    default:
      return state
  }
}
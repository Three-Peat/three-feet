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
  categories: [],
  category: {}
}

/**
 * ACTION CREATORS
 */
const getCategories = categories => ({ type: GET_CATEGORIES, categories })
const getCategory = category => ({ type: GET_CATEGORY, category })


/**
 * THUNK CREATORS
 */
export const allCategories = () =>
  dispatch =>
    axios.get('/api/categories')
      .then(res =>
        dispatch(getCategories(res.data || defaultCategories)))
      .catch(err => console.log(err))

export const oneCategory = categoryId =>
  dispatch =>
    axios.get(`/api/categories/${categoryId}`)
      .then(res =>
        dispatch(getCategory(res.data || defaultCategory)))
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultCategories, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state, categories: action.categories
      }
    case GET_CATEGORY:
      return {
        ...state, category: action.category
      }
    default:
      return state
  }
}
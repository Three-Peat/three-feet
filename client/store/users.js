import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

const GET_ALL_USERS = 'GET_ALL_USERS'

/**
 * INITIAL STATE
 */
const defaultState = []

/**
 * ACTION CREATORS
 */
const getAllUsers = users => ({ type: GET_ALL_USERS, users })

/**
 * THUNK CREATORS
 */

export const fetchUsers = () =>
  dispatch =>
    axios.get('/api/users')
      .then(res =>
        dispatch(getAllUsers(res.data || defaultState)))
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users
    default:
      return state
  }
}

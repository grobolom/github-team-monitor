import { LOGIN_SUCCESS } from '../actions'

export default (state, action) => {
  if (state === undefined) {
    state = { isAuthenticated: false }
  }

  if (action.type === LOGIN_SUCCESS) {
    state = { isAuthenticated: true }
  }

  return state
}
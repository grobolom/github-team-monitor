import { RECEIVE_ALL } from '../actions'

export default (state, action) => {
  if (state === undefined) {
    state = []
  }

  if (action.type === RECEIVE_ALL) {
    state = action.prs
  }

  return state
}
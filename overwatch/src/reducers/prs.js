import { RECEIVE_PRS } from '../actions'

export default (state, action) => {
  if (state === undefined) {
    state = []
  }

  if (action.type === RECEIVE_PRS) {
    state = action.prs
  }

  return state
}
import { SELECT_TEAM } from '../actions'

export default (state, action) => {
  if (state === undefined) {
    state = ""
  }

  if (action.type === SELECT_TEAM) {
    state = action.team
  }

  return state
}
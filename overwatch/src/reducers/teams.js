import { RECEIVE_TEAMS } from '../actions'

export default (state, action) => {
  if (state === undefined) {
    state = []
  }

  if (action.type === RECEIVE_TEAMS) {
    state = action.teams
  }

  return state
}
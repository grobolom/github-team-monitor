import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  prs: function(state, action) {
    if (state == null) {
      state = [];
    }

    if (action.type === 'receivePRs') {
      state = action.prs;
    }

    return state;
  },
  teams: function(state, action) {
    if (state == null) {
      state = [];
    }

    if (action.type === 'receiveTeams') {
      state = action.teams;
    }

    return state;
  },
  isAuthenticated: (state, action) => {
    return false
  }
});

export default rootReducer;

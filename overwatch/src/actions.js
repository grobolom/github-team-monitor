import fetch from 'isomorphic-fetch'

export var RECEIVE_PRS = 'RECEIVE_PRS'
export var RECEIVE_TEAMS = 'RECEIVE_TEAMS'
export var LOGIN_SUCCESS = 'LOGIN_SUCCESS'

export function fetchIssues(team) {
  return dispatch => {
    return fetch('//localhost:5000/teams/' + team + '/issues')
      .then(response => response.json())
      .then(json => dispatch({ type: RECEIVE_PRS, prs: json}))
  }
}

export function fetchTeams() {
  return dispatch => {
    return fetch('//localhost:5000/teams')
      .then(response => response.json())
      .then(json => dispatch({ type: RECEIVE_TEAMS, teams: json}))
  }
}

import axios from 'axios'

export var RECEIVE_PRS = 'RECEIVE_PRS'
export var RECEIVE_TEAMS = 'RECEIVE_TEAMS'
export var LOGIN_SUCCESS = 'LOGIN_SUCCESS'

export function fetchIssues(team) {
  return dispatch => {
    return axios.get('//localhost:5000/teams/' + team + '/issues')
      .then(json => dispatch({ type: RECEIVE_PRS, prs: json.data}))
  }
}

export function fetchTeams() {
  return dispatch => {
    return axios.get('//localhost:5000/teams')
      .then(json => dispatch({ type: RECEIVE_TEAMS, teams: json.data}))
  }
}

export function login(data) {
  return dispatch => {
    return axios.post('//localhost:5000/login', data)
  }
}
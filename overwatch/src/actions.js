import axios from 'axios'

export var RECEIVE_ALL = 'RECEIVE_ALL'
export var RECEIVE_PRS = 'RECEIVE_PRS'
export var RECEIVE_TEAMS = 'RECEIVE_TEAMS'
export var LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export var SELECT_TEAM = 'SELECT_TEAM'

export function fetchAllIssues() {
  return dispatch => {
    return axios.get('//localhost:5000/issues')
      .then(json => dispatch({ type: RECEIVE_ALL, prs: json.data}))
  }
}

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
      .then(json => {
        const token = json.data.access_token
        localStorage.setItem('jwtToken', token)
        setAuthorizationToken(token)
        dispatch(fetchIssues('VID'))
        dispatch(loginSuccess())
      })
  }
}

export function loginSuccess() {
  return {
    type: LOGIN_SUCCESS,
  }
}

export function selectTeam(name) {
  return {
    type: SELECT_TEAM,
    team: name,
  }
}

export function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}
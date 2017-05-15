import fetch from 'isomorphic-fetch'

export function fetchIssues(team) {
  return dispatch => {
    return fetch('//localhost:5000/teams/' + team + '/issues')
      .then(response => response.json())
      .then(json => dispatch({ type: 'receivePRs', prs: json}))
  }
}

export function fetchTeams() {
  return dispatch => {
    return fetch('//localhost:5000/teams')
      .then(response => response.json())
      .then(json => dispatch({ type: 'receiveTeams', teams: json}))
  }
}
